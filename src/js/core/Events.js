
export default {
	PLAY: "paella:play",
	PAUSE: "paella:pause",
	ENDED: "paella:ended",
	SEEK: "paella:seek",
	FULLSCREEN_CHANGED: "paella:fullscreenchanged",
	VOLUME_CHANGED: "paella:volumeChanged",
	TIMEUPDATE: "paella:timeupdate",
	TRIMMING_CHANGED: "paella:trimmingChanged",
	CAPTIONS_CHANGED: "paella:captionsChanged",
	BUTTON_PRESS: "paella:buttonPress"
};

export function bindEvent(player, event, callback) {
	player.__eventListeners__ = player.__eventListeners__ || {};
	player.__eventListeners__[event] = player.__eventListeners__[event] || [];
	player.__eventListeners__[event].push(callback);
	return callback;
}

export function triggerEvent(player, event, params = {}) {
	player.__eventListeners__ &&
	player.__eventListeners__[event] &&
	player.__eventListeners__[event].forEach(cb => cb(params));
}
