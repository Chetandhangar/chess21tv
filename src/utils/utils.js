export function checkHistory(Playlist, video ){
    return !!Playlist.find((item) => item.id === video.id)
}

