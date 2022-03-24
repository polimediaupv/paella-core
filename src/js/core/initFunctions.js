import { getUrlParameter, getHashParameter, joinPath } from '../core/utils';

export async function defaultLoadConfigFunction(configUrl,player) {
    player.log.debug("Using default configuration loading function.");
    const response = await fetch(configUrl);
    return response.json();
}

export async function defaultGetVideoIdFunction(config,player) {
    player.log.debug("Using default getVideoId function");
    return getHashParameter("id") || getUrlParameter("id");
}

export async function defaultGetManifestUrlFunction(repoUrl,videoId,config,player) {
    player.log.debug("Using default getManifestUrl function");
    return joinPath([repoUrl,videoId]);
}

export async function defaultGetManifestFileUrlFunction(manifestUrl,manifestFileName,config,player) {
    player.log.debug("Using default getManifestFileUrl function");
    return joinPath([manifestUrl,manifestFileName]);
}

export async function defaultLoadVideoManifestFunction(videoManifestUrl,config,player) {
    player.log.debug("Using default loadVideoManifest function");
    const response = await fetch(videoManifestUrl);
    if (response.ok) {
        return await response.json();
    }
    else {
        throw new Error(`Error loading video manifest: ${response.status} ${response.statusText}`);
    }
}
