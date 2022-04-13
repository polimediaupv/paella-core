
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
	PLAYER_UNLOADED: "paella:playerUnloaded",
	RESIZE: "paella:resize",
	RESIZE_END: "paella:resizeEnd",
	LAYOUT_CHANGED: "paella:layoutChanged",
	PLAYBACK_RATE_CHANGED: "paella:playbackRateChanged",
	VIDEO_QUALITY_CHANGED: "paella:videoQualityChanged",
	HIDE_UI: "paella:hideUI",
	SHOW_UI: "paella:showUI"
};

export function bindEvent(player, event, callback, unregisterOnUnload = true) {
	player.__eventListeners__ = player.__eventListeners__ || {};
	player.__eventListeners__[event] = player.__eventListeners__[event] || [];
	player.__eventListeners__[event].push({
		callback,
		unregisterOnUnload
	});
	return callback;
}

export function triggerEvent(player, event, params = {}) {
	player.__eventListeners__ &&
	player.__eventListeners__[event] &&
	player.__eventListeners__[event].forEach(cbData => cbData.callback(params));
}

export function triggerIfReady(player, event, params = {}) {
	if (player.ready) {
		triggerEvent(player, event, params);
	}
}

export function unregisterEvents(player) {
	if (!player.__eventListeners__) {
		return;
	}

	for (const event in player.__eventListeners__) {
		player.__eventListeners__[event] = player.__eventListeners__[event].filter(cbData => cbData.unregisterOnUnload == false);
		console.log(player.__eventListeners__[event]);
	}
}
