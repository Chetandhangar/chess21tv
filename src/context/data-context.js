import { createContext , useContext, useReducer,useState} from 'react';
import {reducerFunction} from '../reducer/reducer';
import {useAuth} from '../context/auth-context'
import axios from 'axios';

const DataContext = createContext();


export function DataProvider({children}){
    const [state, dispatch] = useReducer( reducerFunction, {
        watchedLaterPlaylist : [],
        likeList : [],
        watchHistory : [],
        playlist : [{ name : 'myPlaylist' , list : []}]
    })
    const [loader , setLoader] = useState(false)
    const {token} = useAuth();
    const userurl = "https://tv-chess21.chetandhangar.repl.co/user";

   async function addToLikeVideo(video){
       try{
           setLoader(true)
        const response = await axios.post(`${userurl}/likedvideos`, 
        {videoId : video._id}
        ,{headers :{authorization : token}})
        console.log(response,'from post like server');
        if(response.status === 200){
            setLoader(false)
            dispatch({
                type : "ADD_TO_LIKE",
                payload : video
            })
        }
    }catch(error){
           console.log(error);
           setLoader(false)
       }      
    }
    async function removeFromLikeVideo(video){
        try{
            setLoader(true)
            const response = await axios.post(`${userurl}/removelikevideo`,
                {videoId : video._id},
                {headers : {authorization : token}})
            console.log(response,'from remove server')
            if(response.status === 200){
                setLoader(false)
                dispatch({
                    type : "REMOVE_FROM_LIKE_LIST",
                    payload : video
                })
            }
        }catch(error){
            console.log(error);
            setLoader(false)
        }
    }

    async function addToWatchLater(video){
        try{
            setLoader(true)
            const response = await axios.post(`${userurl}/watchlater`,
            {videoId : video._id},
            {headers : {authorization : token}})
            console.log(response,'from add watch later')
            if(response.status === 200){
                setLoader(false)
                dispatch({
                    type : "ADD_TO_WATCHED_LATER",
                    payload : video
                })
            }
        }catch(error){
            console.log(error);
            setLoader(false)
        }
    }
    async function removeFromWatchLater(video){
        try{
            setLoader(true)
            const response = await axios.post(`${userurl}/removewatchlater`,
                {videoId : video._id},
                {headers : {authorization : token}})
            console.log(response,'from remove server')
            if(response.status === 200){
                setLoader(false)
                dispatch({
                    type : "REMOVE_FROM_WATCHLIST",
                    payload : video
                })
            }
        }catch(error){
            console.log(error);
            setLoader(false)
        }
    }
    async function addToWatchHistory(video){
        try{
            const response = await axios.post(`${userurl}/watchhistory`,
            {videoId : video._id},
            {headers : {authorization : token}})
            console.log(response,'from watch history')
            if(response.status === 200){
                dispatch({
                    type : "ADD_TO_WATCH_HISTORY",
                    payload : video
                })
            }
        }catch(error){
            console.log(error);
        }
    }
    async function removeFromWatchHistory(video){
        try{
            setLoader(true)
            const response = await axios.post(`${userurl}/removewatchhistory`,
                {videoId : video._id},
                {headers : {authorization : token}})
            console.log(response,'from history remove server')
            if(response.status === 200){
                setLoader(false)
                dispatch({
                    type : "REMOVE_FROM_WATCH_HISTORY",
                    payload : video
                })
            }
        }catch(error){
            console.log(error);
            setLoader(false)
        }
    }
    console.log(state.likeList,'from state likelist')
    return(
        <DataContext.Provider value={{
        loader , setLoader,
        dispatch, 
        addToLikeVideo,
        removeFromLikeVideo,
        addToWatchHistory,removeFromWatchHistory,
        addToWatchLater,removeFromWatchLater,
        watchedLaterPlaylist: state.watchedLaterPlaylist,
        likeList : state.likeList,
        watchHistory : state.watchHistory,
        playlist : state.playlist}}>
            {children}
        </DataContext.Provider>
    )
}

export function useData(){
    return useContext(DataContext)
}