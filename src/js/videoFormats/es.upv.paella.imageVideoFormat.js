import VideoPlugin, { Video } from 'paella-core/js/core/VideoPlugin';
import { resolveResourcePath } from 'paella-core/js/core/utils';
import VideoQualityItem from 'paella-core/js/core/VideoQualityItem';

function updateFrame(t) {
	let frame = this._currentSource.frames[0];
	this._currentSource.frames.some(f => {
		if (f.time<=this._currentTime) {
			frame = f;
		}
		else {
			return true;
		}
	});
	this.img.src = frame.src;
}

function startTimeUpdate() {
	this._startTimestamp = Date.now();
	const timerFunc = () => {
		this._timer = setTimeout(timerFunc, 250);
		const current = Date.now();
		const interval = current - this._startTimestamp;
		this._currentTime += interval / 1000;// * this._playbackRate;
		this._startTimestamp = current;
		updateFrame.apply(this, [this._currentTime]);
	}
	
	timerFunc();
}

function stopTimeUpdate() {
	if (this._timer) {
		clearTimeout(this._timer);
		this._timer = null;
	}
}

export class ImageVideo extends Video {
	constructor(player, parent) {
		super('img', player, parent);
		
		this._currentTime = 0;
		this._startTimesamp = 0;
		this._playbackRate = 1;
		this._timer = null;
		
		this.video = this.domElement;
	}
	
	async play() {
		startTimeUpdate.apply(this);
	}
	
	async pause() {
		stopTimeUpdate.apply(this);
	}
	
	async duration() {
		return this._currentSource.duration;
	}
	
	get currentTimeSync() {
		return this._currentTime;
	}
	
	async currentTime() {
		return this._currentTime;
	}
	
	async setCurrentTime(t) {
		this._currentTime = t;
		updateFrame.apply(this, [t]);
	}
	
	async volume() {
		return 0;
	}
	
	async setVolume(v) {
		
	}
	
	async paused() {
		return this._timer === null;
	}
	
	async playbackRate() {
		return this._playbackRate;
	}
	
	async setPlaybackRate(pr) {
		this._playbackRate = pr;
	}
	
	async getQualities() {
		return this._qualities;
	}
	
	async setQuality(/* q */) {
		// TODO: This implement this
	}
	
	get currentQuality() {
		return this._currentQuality;
	}
	
	async getDimensions() {
		return this._currentSource.res;
	}
	
	async loadStreamData(streamData) {
		this._sources = streamData.sources.image;
		this._qualities = this._sources.map(src => {
			return new VideoQualityItem({
				src: src.frames[0].src,
				label: `${src.res.w}x${src.res.h}`,
				shortLabel: `${src.res.h}p`,
				width: src.res.w,
				height: src.res.h
			});
		});

		// Select the higher quality frame, by default
		this._currentQuality = this._qualities.length - 1;
		this._qualities.forEach((q,i) => {
			const currentQuality = this._qualities[this._currentQuality];
			if (currentQuality.compare(q)>0) {
				this._currentQuality = i;
			}
		});
		this._currentSource = this._sources[this._currentQuality];
		
		// Sort frames
		this._sources.forEach(src => {
			src.frames.sort((a,b) => a.time - b.time);

		});
		
		return true;
	}
}

export default class ImageVideoPlugin extends VideoPlugin {
	get streamType() {
		return "image";
	}

	isCompatible(streamData) {
		return streamData.sources.image != null;
	}
	
	async getVideoInstance(playerContainer) {
		return new ImageVideo(this.player, playerContainer);
	}
}
