# Image video plugin

The video image plugin is intended to emulate a video by means of a series of images associated to a time instant. Its most optimal use is the playback of videos generated from a slideshow.



## Video manifest format

```json
{
  ...
  "streams": [
		{
			"sources": {
				"image": [
					{
						"mimetype": "image/jpeg",
						"frames": [
							{
								"time": 854,
								"src": "frame_854_hd.jpg"
							},
							{
								"time": 751,
								"src": "frame_751_hd.jpg"
							},
							{
								"time": 0,
								"src": "frame_0_hd.jpg"
							},
							{
								"time": 363,
								"src": "frame_363_hd.jpg"
							}
						],
						"count": 4,
						"duration": 909,
						"res": {
							"w": 1442,
							"h": 1080
						}
					},
					{
						"mimetype": "image/jpeg",
						"frames": [
							{
								"time": 854,
								"src": "frame_854_mid.jpg"
							},
							{
								"time": 751,
								"src": "frame_751_mid.jpg"
							},
							{
								"time": 0,
								"src": "frame_0_mid.jpg"
							},
							{
								"time": 363,
								"src": "frame_363_mid.jpg"
							}
						],
						"count": 4,
						"duration": 909,
						"res": {
							"w": 320,
							"h": 240
						}
					}
				]
			}
		},
```



The format identifier is `image`. The array can contain as many elements as there are available resolutions. All the images for a given resolution must have the same size and the same mimetype. Each element of the array contains the following elements, all of which are required:

- **mimetype:** The mimetype of the images referenced in the `frames` array.
- **frames:** This is the array of references to the images. Each element of the array must contain two elements:
  - **time:** is the instant of time, in seconds, where the frame starts.
  - **src:** reference to the image. It can be an absolute URL or a relative path to the video manifest.
- **count:** number of elements of the array `frames`.
- **duration:** duration of the sequence.
- **res:** image size, in pixels:
  - **w:** image width
  - **h:** image height





