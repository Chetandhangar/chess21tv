import { createContext , useContext, useReducer} from 'react';
import { PLAYLIST } from '../data/data'
import {reducerFunction} from '../reducer/reducer'

const DataContext = createContext();


export function DataProvider({children}){
    const [state, dispatch] = useReducer( reducerFunction, {
        PLAYLIST : PLAYLIST,
        watchedLaterPlaylist : [],
        likeList : [],
        watchHistory : []
    })
    return(
        <DataContext.Provider value={{PLAYLIST : state.PLAYLIST, dispatch, 
        watchedLaterPlaylist: state.watchedLaterPlaylist,
        likeList : state.likeList,
        watchHistory : state.watchHistory}}>
            {children}
        </DataContext.Provider>
    )
}

export function useData(){
    return useContext(DataContext)
}