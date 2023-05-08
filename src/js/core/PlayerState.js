
const PlayerState = Object.freeze({
    UNLOADED: 0,
    LOADING_MANIFEST: 1,
    MANIFEST: 2,
    LOADING_PLAYER: 3,
    LOADED: 4,
    UNLOADING_MANIFEST: 5,
    UNLOADING_PLAYER: 6,
    ERROR: 7
});

export default PlayerState;

