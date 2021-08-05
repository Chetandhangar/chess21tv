import { createContext , useContext, useReducer} from 'react';
import { PLAYLIST } from '../data/data'
import {reducerFunction} from '../reducer/reducer'

const DataContext = createContext();


export function DataProvider({children}){
    const [state, dispatch] = useReducer( reducerFunction, {
        PLAYLIST : PLAYLIST,
        watchedLaterPlaylist : [],
        likeList : []
    })
    return(
        <DataContext.Provider value={{PLAYLIST : state.PLAYLIST, dispatch, 
        watchedLaterPlaylist: state.watchedLaterPlaylist,
        likeList : state.likeList}}>
            {children}
        </DataContext.Provider>
    )
}

export function useData(){
    return useContext(DataContext)
}