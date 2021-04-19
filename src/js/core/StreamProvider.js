import PlayerResource from 'paella-core/js/core/PlayerResource';
import { getVideoPlugin } from 'paella-core/js/core/VideoPlugin';
import Events, { triggerEvent } from 'paella-core/js/core/Events';

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
		streamData.some(s => {
			if (s.role === "mainAudio") {
				mainAudioContent = s.content;
				return true;
			}
		});
	
		
		console.debug("Finding compatible video plugins");
		
		// Find video plugins for each stream
		this._streamData.forEach(stream => {
			const videoPlugin = getVideoPlugin(this.player, stream);
			if (!videoPlugin) {
				throw Error(`Incompatible stream type: ${ stream.content }`);
			}
			
			this._streams[stream.content] = {
				stream,
				videoPlugin
			}
		})
		
		let videoEndedEventTimer = null;
		for (const content in this._streams) {
			const s = this._streams[content];
			s.player = await s.videoPlugin.getVideoInstance(this._videoContainer);
			if (mainAudioContent===content) {
				this._mainAudioPlayer = s.player;
			}
			
			await s.player.load(s.stream, this);			
			s.player.onVideoEnded(() => {
				if (videoEndedEventTimer === null) {
					triggerEvent(this.player, Events.ENDED);
					videoEndedEventTimer = setTimeout(() => {
						videoEndedEventTimer = null;
					}, 2000);
				}
			})
			this._players.push(s.player);
		}
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
		const currentTime = await this.currentTime();
		triggerEvent(this.player, Events.TIMEUPDATE, { currentTime: currentTime });
	}
	
	startStreamSync() {
		const setupSyncTimer = async () => {
			// TODO: sync
			// TODO: Event.ENDED
			
			let currentTime = this._players[0].currentTimeSync;
			
			// Check trimming
			if (this.isTrimEnabled) {
				let trimmedCurrentTime = currentTime - this.trimStart;
				if (this.trimEnd<=currentTime) {
					await this.executeAction("pause");
					await this.setCurrentTime(0);
					this.stopStreamSync();
					currentTime = 0;
					triggerEvent(this.player, Events.ENDED, {});
					return;
				}
				else if (currentTime<this.trimStart) {
					await this.setCurrentTime(0);
					currentTime = this.trimStart;
					trimmedCurrentTime = 0;
				}
				
				triggerEvent(this.player, Events.TIMEUPDATE, { currentTime: trimmedCurrentTime });
				this._timeupdateTimer = setTimeout(() => {
					setupSyncTimer();	
				}, 250);
			}
			else {
				triggerEvent(this.player, Events.TIMEUPDATE, { currentTime });
				this._timeupdateTimer = setTimeout(() => {
					setupSyncTimer();	
				}, 250);
			}
		}
		setupSyncTimer();
	}
	
	stopStreamSync() {
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
			
			Promise.all(p).then(() => resolve(res));
		})
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
		const prevTime = (await this.executeAction("currentTime"))[0];
		const newTime = (await this.executeAction("currentTime"))[0];
		if (this.isTrimEnabled) {
			t = t + this.trimStart;
			t = t >= this.trimEnd ? this.trimEnd : t;
			const result = (await this.executeAction("setCurrentTime", [t]))[0];
			return {
				result,
				prevTime: prevTime + this.trimStart,
				newTime: newTime + this.trimStart
			}
		}
		else {
			const result = (await this.executeAction("setCurrentTime", [t]))[0];
			return { result, prevTime, newTime };
		}
		
		const currentTime = await this.currentTime();
		triggerEvent(this.player, Events.TIMEUPDATE, { currentTime: currentTime });
	}
	
	async currentTime() {
		const currentTime = (await this.executeAction("currentTime"))[0];
		if (this.isTrimEnabled) {
			return currentTime - this.trimStart;
		}
		else {
			return currentTime;
		}
	}
	
	async currentTimeIgnoringTrimming() {
		const currentTime = (await this.executeAction("currentTime"))[0];
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
			return (await this.executeAction("duration"))[0];	
		}
	}
	
	async durationIgnoringTrimming() {
		return (await this.executeAction("duration"))[0];
	}

	async playbackRate() {
		return (await this.executeAction("playbackRate"))[0];
	}

	async setPlaybackRate(rate) {
		return (await this.executeAction("setPlaybackRate",[rate]))[0];
	}
}