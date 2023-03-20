# Preferences API (paella >= 1.19)

The preferences API allows you to manage key/value type data, globally for the website or specific to the current video. Preference data can be stored in a cookie, via the [cookie consent API](cookie_consent.md), or using [data plugins](data_plugins.md).

## Configuration

The preference settings are set in the configuration file, in the `preferences` section.

```json
{
    ...
    "preferences": {
        "currentSource": "cookie",
        "sources": {
            "cookie": {
                "consentType": "necessary"
            },
            "dataPlugin": {
                "context": "preferences"
            }
        }
    }
    ...
}
```

- `sources`: sets the configuration of the different data sources to save the preferences. There are two different data sources:
    + `cookie`: cookie consent API preferences. Here you can configure the consent type to use. Note that if you store preferences that can identify the user (e.g., a unique user ID or email), you must use a consentType that can be disabled to comply with data protection regulations.
    + `dataPlugin`: configuration of the data source that uses data plugins. In this section you can configure the context that will be used to resolve the data plugin. For more information, see the documentation on [data plugins](data_plugins.md).
- `currentSource`: sets which data source is to be used. The possible values are those defined in `sources`.

## Using the API

This API is used internally in `paella-core` to store some settings, like for example the volume of the video, or the last known time instant for a video identifier. But it can also be used by external plugins 

You can also use the API through the `player.preferences` object. Preferences can be stored globally or specifically for the current video. If the property is global, it will be available for any video that is loaded, otherwise it will only be stored for that specific video. It is possible to store a global and a specific property with the same key, both will be stored.

- `async player.preferences.set(key, value, { global = false } = {})`: Stores a value associated with a key.
- `async player.preferences.get(key, { global = false } = {})`: Returns a value associated with a key. If the required property is not present, this function will return `undefined`.
