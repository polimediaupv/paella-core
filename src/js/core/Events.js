
export default {
	PLAY: "paella:play",
	PAUSE: "paella:pause",
	STOP: "paella:stop",
	ENDED: "paella:ended",
	SEEK: "paella:seek",
	FULLSCREEN_CHANGED: "paella:fullscreenchanged",
	VOLUME_CHANGED: "paella:volumeChanged",
	TIMEUPDATE: "paella:timeupdate",
	TRIMMING_CHANGED: "paella:trimmingChanged",
	CAPTIONS_CHANGED: "paella:captionsChanged",
	BUTTON_PRESS: "paella:buttonPress",
	SHOW_POPUP: "paella:showPopUp",
	HIDE_POPUP: "paella:hidePopUp",
	MANIFEST_LOADED: "paella:manifestLoaded",
	STREAM_LOADED: "paella:streamLoaded",
	PLAYER_LOADED: "paella:playerLoaded",
	PLAYER_UNLOADED: "paella:playerUnloaded"
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

export function triggerIfReady(player, event, params = {}) {
	if (player.ready) {
		triggerEvent(player, event, params);
	}
}