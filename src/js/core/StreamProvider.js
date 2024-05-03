import PlayerResource from './PlayerResource';
import { getVideoPlugin } from './VideoPlugin';
import { loadCanvasPlugins, getCanvasPlugin, unloadCanvasPlugins } from './CanvasPlugin';
import Events, { triggerIfReady } from './Events';


export function checkManifestIntegrity(manifest) {
	const check = (field, error) => {
		if (!field) {
			throw new Error(`Invalid video manifest: ${error}`);
		}
	}

	check(manifest.streams, "missing 'streams' object.");
	check(manifest.streams.length>0, "the 'streams' array is empty.");
	check(manifest.metadata?.preview, "the 'metadata.preview' field is required.");
}

export default class SteramProvider extends PlayerResource {
	constructor(player, videoContainer) {
		super(player, videoContainer);
		this._videoContainer = videoContainer;
		this._streamData = null;
		this._streams = null;
		this._players = [];
		
		this._mainAudioPlayer = null;
		
		this._streamSyncTimer = null;
		
		this._trimming = {
			enabled: false,
			start: 100,
			end: 200
		}
	}
	
	async load(streamData) {
		this._streamData = streamData;
		this._streams = {};
		
		let mainAudioContent = this.player.config.defaultAudioStream || "presenter";
		if (this._streamData.length === 1) {
			mainAudioContent = this._streamData[0].content;
		}
		streamData.some(s => {
			if (s.role === "mainAudio") {
				mainAudioContent = s.content;
				return true;
			}
		});
	
		
		this.player.log.debug("Finding compatible video plugins");

		await loadCanvasPlugins(this.player);
		
		// Find video plugins for each stream
		for (const stream of this._streamData) {
			const canvasPlugin = getCanvasPlugin(this.player, stream);
			if (!canvasPlugin) {
				throw Error(`Canvas plugin not found: ${ stream.canvas }`);
			}

			const isMainAudio = stream.content === mainAudioContent;
			const videoPlugin = await getVideoPlugin(this.player, stream);
			if (!videoPlugin) {
				throw Error(`Incompatible stream type: ${ stream.content }`);
			}
			
			this._streams[stream.content] = {
				stream,
				isMainAudio,
				videoPlugin,
				canvasPlugin
			}
		}
		
		for (const content in this._streams) {
			const s = this._streams[content];
			s.canvas = await s.canvasPlugin.getCanvasInstance(this._videoContainer);
			s.player = await s.videoPlugin.getVideoInstance(s.canvas.element, s.isMainAudio);
			if (mainAudioContent===content) {
				this._mainAudioPlayer = s.player;
				s.player.initVolume(1);
			}
			else {
				s.player.initVolume(0);
			}
			
			await s.player.load(s.stream, this);
			await s.canvas.loadCanvas(s.player);		
			s.player.onVideoEnded(() => {
				// Pause all streams, to prevent other vídeos from playing, when not all the
				// streams have the same duration.
				this.executeAction("pause");
				
				// Set current time to 0 to put the video in the initial state
				this.executeAction("setCurrentTime", 0);

				// Trigger the ended event
				triggerIfReady(this.player, Events.ENDED);
			})
			this._players.push(s.player);
		}

		if (this.mainAudioPlayer === null) {
			this.player.log.error("The video stream containing the audio track could not be identified. The `role` attribute must be specified in the main video stream, or the `defaultAudioStream` attribute must be set correctly in the player configuration.");
			throw new Error("The video stream containing the audio track could not be identified.");
		}
	}

	async unload() {
		this.stopStreamSync();
		await unloadCanvasPlugins(this.player);
	}
	
	get players() {
		return this._players;
	}
	
	// This is the raw streamData loaded from the video manifest
	get streamData() {
		return this._streamData;
	}
	
	// This property stores the available streams, indexed by the content identifier, and contains the
	// stream data, the video plugin and the player, for each content identifier.
	get streams() {
		return this._streams;
	}
	
	get mainAudioPlayer() {
		return this._mainAudioPlayer;
	}
	
	get isTrimEnabled() {
		return this._trimming?.enabled &&
			this._trimming?.end > this._trimming?.start;
	}
	
	get trimStart() {
		return this._trimming?.start;
	}
	
	get trimEnd() {
		return this._trimming?.end;
	}
	
	async setTrimming({ enabled, start, end }) {
		if (start>=end) {
			throw Error(`Error setting trimming: start time (${ start }) must be lower than end time ${ end }`);
		}
		this._trimming = {
			enabled,
			start,
			end
		};
		const currentTime = await this.currentTime()
		triggerIfReady(this.player, Events.TIMEUPDATE, { currentTime: enabled ? start + currentTime : currentTime });
	}
	
	startStreamSync() {
		this._timeSync = true;
		const setupSyncTimer = async () => {
			if (!this._players.length) {
				this.player.log.warn("Player not yet loaded. Waiting for video sync.");
				return;
			}
			
			let currentTime = this.mainAudioPlayer.currentTimeSync;
			const maxSync = 0.2;

			if (this.players.length>1) {
				for (let i = 0; i<this.players.length; ++i) {
					const secPlayer = this.players[i];
					if (secPlayer !== this.mainAudioPlayer) {
						const playerTime = secPlayer.currentTimeSync;
						if (Math.abs(currentTime - playerTime) > maxSync) {
							this.player.log.debug("Video synchronization triggered");
							secPlayer.setCurrentTime(currentTime);
						}
					}
				}
			}
			
			// Check trimming
			if (this.isTrimEnabled) {
				let trimmedCurrentTime = currentTime - this.trimStart;
				if (this.trimEnd<=currentTime) {
					await this.executeAction("pause");
					await this.setCurrentTime(0);
					this.stopStreamSync();
					currentTime = 0;
					triggerIfReady(this.player, Events.ENDED, {});
					return;
				}
				else if (currentTime<this.trimStart) {
					await this.setCurrentTime(0);
					currentTime = this.trimStart;
					trimmedCurrentTime = 0;
				}
				
				triggerIfReady(this.player, Events.TIMEUPDATE, { currentTime: trimmedCurrentTime });
				this._timeupdateTimer = setTimeout(() => {
					if (this._timeSync) {
						setupSyncTimer();
					}
				}, 250);
			}
			else if (this._timeSync) {
				triggerIfReady(this.player, Events.TIMEUPDATE, { currentTime });
				this._timeupdateTimer = setTimeout(() => {
					setupSyncTimer();	
				}, 250);
			}
		}
		setupSyncTimer();
	}
	
	stopStreamSync() {
		this._timeSync = false;
		if (this._timeupdateTimer) {
			clearTimeout(this._timeupdateTimer);
		}
	}
	
	executeAction(fnName, params = []) {
		// Important: this implementation must be done using promises instead of async/await, due to
		// a bug in babel that causes that the resulting array may not be available when the async function
		// is completed.
		if (!Array.isArray(params)) {
			params = [params];
		}
		return new Promise((resolve) => {
			let res = [];
			let p = [];
			this.players.forEach(player => {
				p.push(new Promise(innerResolve => {
					player[fnName](...params).then(r => {
						res.push(r);
						innerResolve();
					})
				}));
			})
			
			Promise.allSettled(p).then(() => resolve(res));
		})
	}

	get isLiveStream() {
		return this._streamData.some(sd => Array.from(Object.keys(sd.sources)).indexOf("hlsLive") !== -1);
	}
	
	async play() {
		this.startStreamSync();
		const result = await this.executeAction("play");
		return result;
	}

	async pause() {
		this.stopStreamSync();
		const result = await this.executeAction("pause");
		return result;
	}
	
	async stop() {
		this.stopStreamSync()
		await this.executeAction("pause");
		await this.executeAction("setCurrentTime", 0);
	}
	
	async paused() {
		return (await this.executeAction("paused"))[0];
	}

	async setCurrentTime(t) {
		const duration = await this.duration();
        if (t < 0) {
            t = 0;
        }
        else if (t > duration) {
            t = duration;
        }

		const prevTime = (await this.executeAction("currentTime"))[0];
		let returnValue = null;

		if (this.isTrimEnabled) {
			t = t + this.trimStart;
			t = t >= this.trimEnd ? this.trimEnd : t;
			const result = (await this.executeAction("setCurrentTime", [t]))[0];
			const newTime = (await this.executeAction("currentTime"))[0];
			returnValue = {
				result,
				prevTime: prevTime - this.trimStart,
				newTime: newTime - this.trimStart
			}
		}
		else {
			const result = (await this.executeAction("setCurrentTime", [t]))[0];
			const newTime = (await this.executeAction("currentTime"))[0];
			returnValue = { result, prevTime, newTime };
		}
		
		const currentTime = await this.currentTime();
		triggerIfReady(this.player, Events.TIMEUPDATE, { currentTime: currentTime });

		return returnValue;
	}
	
	async currentTime() {
		const currentTime = await this.mainAudioPlayer.currentTime();
		if (this.isTrimEnabled) {
			return currentTime - this.trimStart;
		}
		else {
			return currentTime;
		}
	}
	
	async currentTimeIgnoringTrimming() {
		const currentTime = await this.mainAudioPlayer.currentTime();
		return currentTime;
	}
	
	async volume() {
		if (this.mainAudioPlayer) {
			return await this.mainAudioPlayer.volume();
		}
		else {		
			return (await this.executeAction("volume"))[0];
		}
	}
	
	async setVolume(v) {
		if (this.mainAudioPlayer) {
			return await this.mainAudioPlayer.setVolume(v);
		}
		else {
			return (await this.executeAction("setVolume",[v]))[0];
		}
	}
	
	async duration() {
		if (this.isTrimEnabled) {
			return this.trimEnd - this.trimStart;	
		}
		else {
			return await this.durationIgnoringTrimming();
		}
	}
	
	async durationIgnoringTrimming() {
		const result = (await this.executeAction("duration")).reduce((acc, val) => Math.min(acc, val), Number.MAX_VALUE);
		return result;
	}

	async playbackRate() {
		return (await this.executeAction("playbackRate"))[0];
	}

	async setPlaybackRate(rate) {
		return (await this.executeAction("setPlaybackRate",[rate]))[0];
	}

	async getQualityReferencePlayer() {
		let player = null;
		let referenceQualities = [];
		if (Object.keys(this.streams).length>0) {
			for (const content in this.streams) {
				const stream = this.streams[content];
				const q = (await stream.player.getQualities()) || [];
				if (!player && q.length > referenceQualities.length) {
					referenceQualities = q;
					player = stream.player;
				}
			}
		}
		return player || this.mainAudioPlayer;
	}

	async getCurrentQuality() {
		return (await this.getQualityReferencePlayer()).currentQuality;
	}

	async getQualities() {
		const player = await this.getQualityReferencePlayer();
		return await player.getQualities();
	}

	async setQuality(quality) {
		const player = await this.getQualityReferencePlayer();

		const qualities = await player.getQualities();
		const total = qualities.length;
		let index = -1;
		qualities.some((q,i) => {
			if (quality.index === q.index) {
				index = i;
			}
			return index !== -1;
		});

		if (index>=0) {
			const qualityFactor = index / total;
			for (const content in this.streams) {
				const stream = this.streams[content];
				const streamQualities = (await stream.player.getQualities()) || [];
				this.player.log.debug(streamQualities);
				if (streamQualities.length>1) {
					const qualityIndex = Math.round(streamQualities.length * qualityFactor);
					const selectedQuality = streamQualities[qualityIndex];
					await stream.player.setQuality(selectedQuality);
				}
			}
		}
	}

	async supportsMultiaudio() {
		return this.mainAudioPlayer.supportsMultiaudio();
	}

	async getAudioTracks() {
		return this.mainAudioPlayer.getAudioTracks();
	}

	async setCurrentAudioTrack(track) {
		return this.mainAudioPlayer.setCurrentAudioTrack(track);
	}

	get currentAudioTrack() {
		return this.mainAudioPlayer.currentAudioTrack;
	}
}