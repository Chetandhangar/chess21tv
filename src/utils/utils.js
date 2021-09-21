export function checkHistory(Playlist, video ){
    return !!Playlist?.find((item) => item._id === video?._id)
}


export function checkLikes({ likeList, videoId}){
    return likeList?.find((item) => item._id === videoId) ? true : false;
}

export function checkWatchLater({ watchedLaterPlaylist, videoId}){
    return  watchedLaterPlaylist?.find((item) => item._id === videoId) ? true : false;
}
