const ADD_TO_WATCHED_LATER = "ADD_TO_WATCHED_LATER";
const REMOVE_FROM_WATCHLIST = "REMOVE_FROM_WATCHLIST";
const ADD_TO_LIKE = "ADD_TO_LIKE";
const REMOVE_FROM_LIKE_LIST = "REMOVE_FROM_LIKE_LIST";
const ADD_TO_WATCH_HISTORY = "ADD_TO_WATCH_HISTORY";
const REMOVE_FROM_WATCH_HISTORY = "REMOVE_FROM_WATCH_HISTORY";
const CREATE_NEW_PLAYLIST = "CREATE_NEW_PLAYLIST"

export function reducerFunction(state, action){
    switch(action.type){
        case  ADD_TO_WATCHED_LATER:
            console.log("calling me in reduer add watch later")
            return{
                ...state,
                watchedLaterPlaylist : addToList(state.watchedLaterPlaylist, action.payload)
            }
        case REMOVE_FROM_WATCHLIST:
            return{
                ...state,
                watchedLaterPlaylist : removeFromList(state.watchedLaterPlaylist, action.payload)
            }
        case ADD_TO_LIKE :
            return{
                ...state,
                likeList  : addToList(state.likeList, action.payload)
            }
        case REMOVE_FROM_LIKE_LIST:
            return{
                ...state,
                likeList : removeFromList(state.likeList, action.payload)
            }
        
        case ADD_TO_WATCH_HISTORY:
            return{
                ...state,
                watchHistory : addToList(state.watchHistory , action.payload)
            }
        case REMOVE_FROM_WATCH_HISTORY:
            console.log("called fromm remove remove watch")
            return{
                ...state,
                watchHistory : removeFromList(state.watchHistory, action.payload)
            }
        case CREATE_NEW_PLAYLIST:
            return{
                ...state,
                playlist : [...state.playlist, {name : action.payload , list : []}]
            }

        default : 
        return {
            ...state
        }
    }
} 

export function removeFromList(Playlist,video){
    return Playlist.filter((item) => item.id !== video.id)
}

export function addToList(Playlist, video){
    let ind = Playlist.findIndex((item) => item._id === video._id)
    if(ind === -1){
        return [...Playlist, video]
    }
    else{
        alert("Already in list")
        return [...Playlist]
    }
    
}
