import { createContext , useContext, useReducer} from 'react';
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
    const {token} = useAuth();
    const userurl = "https://tv-chess21.chetandhangar.repl.co/user";

   async function addToLikeVideo(video){
       try{
        const response = await axios.post(`${userurl}/likedvideos`, 
        {videoId : video._id}
        ,{headers :{authorization : token}})
        console.log(response,'from post like server');
        if(response.status === 200){
            dispatch({
                type : "ADD_TO_LIKE",
                payload : video
            })
        }
    }catch(error){
           console.log(error)
       }      
    }
    async function removeFromLikeVideo(video){
        try{
            const response = await axios.post(`${userurl}/removelikevideo`,
                {videoId : video._id},
                {headers : {authorization : token}})
            console.log(response,'from remove server')
            if(response.status === 200){
                dispatch({
                    type : "REMOVE_FROM_LIKE_LIST",
                    payload : video
                })
            }
        }catch(error){
            console.log(error);
        }
    }
    console.log(state.likeList,'from state likelist')
    return(
        <DataContext.Provider value={{
        dispatch, 
        addToLikeVideo,
        removeFromLikeVideo,
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