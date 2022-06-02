# Configure Wowza for HLS Low latency

See [HTTP Live Streaming Wikipedia Page](https://en.wikipedia.org/wiki/HTTP_Live_Streaming#Low_Latency_HLS)

Two unrelated HLS extensions with a "Low Latency" name and corresponding acronym exist:

1. [Apple Low Latency HLS (ALHLS)](https://developer.apple.com/videos/play/wwdc2019/502/) which was announced by Apple at WWDC2019
2. ["Community LHLS"](https://mux.com/blog/the-community-gave-us-low-latency-live-streaming-then-apple-took-it-away/) (LHLS) which predated Apple's publication and is allegedly simpler


We are going to configure Wowza to use CMAF packetizer

Worth reading:
- [Wowza. What is CMAF](https://www.wowza.com/blog/what-is-cmaf)
- [Wowza. Low-Latency CMAF for Live Streaming at Scale](https://www.wowza.com/blog/low-latency-cmaf-chunked-transfer-encoding#chunked-encoding)
    + [Chunked-Encoded CMAF Files](https://www.wowza.com/blog/low-latency-cmaf-chunked-transfer-encoding#chunked-encoding)
    + [Chunked Transfer Encoding](https://www.wowza.com/blog/low-latency-cmaf-chunked-transfer-encoding#chunked-transfer-encoding)
- [Wowza. What is Low-Latency HLS and How Does It Relate to CMAF](https://www.wowza.com/blog/apple-low-latency-hls)
- [Apple. Enabling Low-Latency HTTP Live Streaming (HLS)](https://developer.apple.com/documentation/http_live_streaming/enabling_low-latency_http_live_streaming_hls)


# Before you start

You should complete the following tasks:

- Configure your port for HTTPS playback with an SSL/TLS certificate according to [Get SSL/TLS certificates from the Wowza Streaming Engine StreamLock service](https://www.wowza.com/docs/how-to-get-ssl-certificates-from-the-streamlock-service). LL-HLS playback **does not** work without an SSL/TLS secured port.


# Wowza Low Latency application configuration

Wowza Streaming Engine generates Low-Latency HLS streams using the CMAF packetizer, cmafstreamingpacketizer. The packetizer creates chunks that are used as the video and audio partial segments needed for LL-HLS. The LL-HLS streams use the fMP4 container format and are delivered to players over HTTP/2.

To deliver LL-HLS streams from Wowza Streaming Engine you have to manually enable low latency CMAF packetization for live streaming, in the application, by editing the application's configuration in XML.

We are going to follow the [Deliver Low-Latency HLS live streams](https://www.wowza.com/docs/deliver-apple-low-latency-hls-live-streams-using-wowza-streaming-engine) guide.

In short, we need to create a new Live Application with the following configuration:

1. Playback Types
    - [ ]: MPEG-DASH
    - [X]: Apple HLS
    - [ ]: Adobe RTMP
    - [ ]: RTSP/RTP
2. Options
    - [ ]: Low-latency stream (ideal for chat applications)
    - [ ]: Record all incoming streams
    - [X]: Cross-origin resource sharing (CORS) (for HTTP-based streams)

Then, we need to to modify the Application.xml file, located in `[install-dir]/conf/[app.name]/Application.xml`, as follows:

1. Set the `<LiveStreamPacketizers>` to `cmafstreamingpacketizer`
2. Add the `cmafLLEnableLowLatency` property to the `LiveStreamPacketizer` container element and set it to true.
    ```
    <LiveStreamPacketizer>
        <Properties>
            <Property>
                <Name>cmafLLEnableLowLatency</Name>
                <Value>true</Value>
                <Type>Boolean</Type>
            </Property>
        </Properties>
    </LiveStreamPacketizer>
    ```
3. The `HTTPStreamers` property to `cupertinostreaming`
4. Configure the `cmafLLChunkDurationTargetAudio`, `cmafLLChunkDurationTargetVideo`, `cmafSegmentDurationTarget` properties. These are the parameters that we have modified and give us good results according to our tests.
    ```
        <Properties>
            <Property>
                    <Name>cmafLLChunkDurationTargetAudio</Name>
                    <Value>2000</Value>
                    <Type>Integer</Type>
            </Property>
            <Property>
                    <Name>cmafLLChunkDurationTargetVideo</Name>
                    <Value>2000</Value>
                    <Type>Integer</Type>
            </Property>
            <Property>
                    <Name>cmafSegmentDurationTarget</Name>
                    <Value>6000</Value>
                    <Type>Integer</Type>
            </Property>
        </Properties>
    ```
Here you can view the changes done to the `Application.xml` file:

```diff
@@ -32,7 +32,7 @@
                        <StorageDir>${com.wowza.wms.context.VHostConfigHome}/content</StorageDir>
                        <KeyDir>${com.wowza.wms.context.VHostConfigHome}/keys</KeyDir>
                        <!-- LiveStreamPacketizers (separate with commas): cupertinostreamingpacketizer,
                        smoothstreamingpacketizer, sanjosestreamingpacketizer, mpegdashstreamingpacketizer,
                        cupertinostreamingrepeater, smoothstreamingrepeater, sanjosestreamingrepeater,
                        mpegdashstreamingrepeater, dvrstreamingpacketizer, dvrstreamingrepeater -->
-                       <LiveStreamPacketizers>cupertinostreamingpacketizer</LiveStreamPacketizers>
+                       <LiveStreamPacketizers>cmafstreamingpacketizer</LiveStreamPacketizers>
                        <!-- Properties defined here will override any properties defined in conf/Streams.xml
                        for any streams types loaded by this application -->
                        <Properties>
                        </Properties>
@@ -159,6 +159,11 @@
                <LiveStreamPacketizer>
                        <!-- Properties defined here will override any properties defined in 
                        conf/LiveStreamPacketizers.xml for any LiveStreamPacketizers loaded by
                        this applications -->
                        <Properties>
+                               <Property>
+                                       <Name>cmafLLEnableLowLatency</Name>
+                                       <Value>true</Value>
+                                       <Type>Boolean</Type>
+                               </Property>
+                               <Property>
+                                       <Name>cmafLLChunkDurationTargetAudio</Name>
+                                       <Value>2000</Value>
+                                       <Type>Integer</Type>
+                               </Property>
+                               <Property>
+                                       <Name>cmafLLChunkDurationTargetVideo</Name>
+                                       <Value>2000</Value>
+                                       <Type>Integer</Type>
+                               </Property>
+                               <Property>
+                                       <Name>cmafSegmentDurationTarget</Name>
+                                       <Value>6000</Value>
+                                       <Type>Integer</Type>
+                               </Property>
                        </Properties>
                </LiveStreamPacketizer>
                <HTTPStreamer>
```

Now, you have to enable `http2`. yopu need to modify the `[install-dir]/conf/VHost.xml` file and add the `AllowHttp2` property to the `<SSLConfig>` container element in the `<HostPort>` you configured for SSL/TLS and set it to true.
```xml
<SSLConfig>
    ...
    <AllowHttp2>true</AllowHttp2>
    ...
</SSLConfig>
```


Now we have LL-HLS enabled. 

It is important to note that, Wowza Streaming Engine can produce HLS live streams by using either of two packetizers: the "Cupertino" packetizer, `cupertinostreamingpacketizer`, or the CMAF packetizer, `cmafstreamingpacketizer`.

If you enable both, please read this guide:
- [Manage CMAF playback from Wowza Streaming Engine](https://www.wowza.com/docs/manage-cmaf-playback-from-wowza-streaming-engine)

# Customize how live streams are packetized

To customize the packetization properties, please read this guide: 
- [Configure CMAF live streaming packetization](https://www.wowza.com/docs/configure-cmaf-packetization-in-wowza-streaming-engine#cmaf-live-packetization-property-reference)


# Encoding requirements in the encoder client application

We use OBS studio as encoder application

To bypass encoding streams with Transcoder, source streams should meet the following encoding recommendations. Otherwise, transcoding is recommended.

**Encoding recommendations:**

- CMAF-supported codecs (required)
    * Video:
        - H.264
        - H.265
    * Audio:
        - AAC, AAC-LC, HE-AAC (AAC+ or aacPlus), HE-AACv2 (enhanced AAC+, aacPlus v2)
        - Dolby Digital 5.1 Surround Sound (AC-3) and Dolby Digital Plus (Enhanced AC-3 or E-AC-3)

- GOP size: 1 or 2 seconds
- Closed GOPs
- H.264 and H.265 byte streams contain metadata about the GOP structure
- Constant frame rate video

Please read the [wowza guide](https://www.wowza.com/docs/deliver-apple-low-latency-hls-live-streams-using-wowza-streaming-engine#transcoding-considerations-for-ll-hls7).


# Transcoding and Adaptive bitrate considerations for LL-HLS
**Warning**:
```
We did not test it.
```

To bypass encoding streams with Transcoder, source streams should meet the following encoding recommendations. Otherwise, transcoding is recommended.

You can create adaptive bitrate (ABR) live streams using CMAF, the open, extensible standard that allows streams to be played over both the HLS and MPEG-DASH protocols. CMAF is disabled by default. CMAF live streams must be enabled manually, by editing an application's configuration in XML or by using the Wowza Streaming Engine REST API. We recommend editing an application's configuration in XML as described in this article.

- [Set up and run Transcoder in Wowza Streaming Engine](https://www.wowza.com/docs/how-to-set-up-and-run-wowza-transcoder-for-live-streaming)
- [Create adaptive bitrate CMAF streams](https://www.wowza.com/docs/create-adaptive-bitrate-cmaf-streams-using-wowza-streaming-engine#set-up-adaptive-bitrate-cmaf-streaming)
- [Stream adaptive bitrate content with Wowza Streaming Engine](https://www.wowza.com/docs/stream-adaptive-bitrate-content-with-wowza-streaming-engine)


# Low Latency HLS - Edge
One big advantage of LL HLS is that it can benefit of scaling the broadcast as a normal HLS application.

Please notice that `cmafSegmentDurationTarget` should be set to the same value on edge and origin. See [CMAF properties reference](https://www.wowza.com/docs/configure-cmaf-packetization-in-wowza-streaming-engine#cmaf-live-packetization-property-reference1).


# Using external CDN
Following same configuration as a LL HLS Wowza origin indicated at [Deliver Low-Latency HLS live streams using Wowza Streaming Engine](https://www.wowza.com/docs/deliver-apple-low-latency-hls-live-streams-using-wowza-streaming-engine), but using an [Live HTTP Origin instead](https://www.wowza.com/docs/how-to-configure-a-wowza-server-as-an-http-caching-origin).


# Paella configuration
We have defined this configuration for the Low Latency to work well when we have Origin and Edges.
These are the ones that have given us the best results.
```
    "es.upv.paella.hlsLiveVideoFormat": {
        "enabled": true,
        "order": 0,
        "hlsConfig": {
            "enableWorker": true,
            "lowLatencyMode": true,
            "maxBufferLength": 10,
            "liveSyncDuration": 3,
            "liveMaxLatencyDuration": 6,
            "liveDurationInfinity": true,
            "highBufferWatchdogPeriod": 1
        },
        "corsConfig": {
            "withCredentials": false,
            "requestHeaders": {
                "Access-Control-Allow-Credentials": true
            }
        }
    },
```