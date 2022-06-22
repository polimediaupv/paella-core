import plugins from './src/js/plugins/**';
import layouts from './src/js/layouts/**';
import videoFormats from './src/js/videoFormats/**';
import canvas from './src/js/canvas/**';
import data from './src/js/data/**';

export default [
    plugins,
    layouts,
    videoFormats,
    canvas,
    data
    //require.context("./src/js/plugins", true, /\.js/),
    //require.context("./src/js/layouts", true, /\.js/),
    //require.context("./src/js/videoFormats", true, /\.js/),
    //require.context("./src/js/canvas", true, /\.js/),
    //require.context("./src/js/data", true, /\.js/)
]