export function checkHistory(Playlist, video ){
    return !!Playlist?.find((item) => item._id === video?._id)
}

