# paella-core versions

## paella-core 1.1.x

### Improvements

- [es.upv.paella.audioVideoFormat](audio-video-plugin.md) plugin added
- [es.upv.paella.audioCanvas](audio_canvas_plugin.md) plugin added

## paella-core 1.2.x

- [Plugin icon customization API](plugin_icon_customization.md) added.
- [Progress indicator plugin](progress_indicator_plugin.md) added.
- Improvements in progress indicator time configuration. For more information, see [this document](progress_indicator_customization.md).

## paella-core 1.3.x

- [Improvements in progress indicator](progress_indicator_customization.md): Now it is possible to show a handler button to seek the video timeline.
- The `enableCache` parameter in [hls plugin configuration](hls_video_plugin.md) has been renamed to `disableCache`.

## paella-core 1.4.x

- [Improvements in video container customization](video_container.md): It is now possible to place the video container on top of the playback bar, so that the playback bar does not hide the video at the bottom.
- [No interactive button plugins added](button_plugin.md): It is now possible to create non-interactive buttons, which allow you to display disabled player options, or visual elements such as logos.
- [Buttons without icon (title only)](button_plugin.md): It is now possible to create button plugins that only contain text (no icon).
- [Improvements in playback bar and buttons customization](button_plugin.md): New CSS variables added `--button-fixed-width`, `--button-fixed-height`, `--playback-bar-height` and `--button-icon-size`.
- [New DataPlugin API](data_plugins.md): Now more than one data plugin can receive `write` and `remove` operations simultaneously. Read operations are still received only by the highest priority data plugin for that context.

## paella-core 1.5

- The volume and playback rate values are now saved, to be restored when the player is next loaded. This function can be activated or deactivated in the configuration.
- `CAPTIONS_ENABLED` and `CAPTIONS_DISABLED` events added. Triggered when the user enable or disable a captions track.


