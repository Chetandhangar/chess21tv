import { createContext , useContext} from 'react';
import { PLAYLIST } from '../data/data'

const DataContext = createContext();


export function DataProvider({children}){
    return(
        <DataContext.Provider value={{PLAYLIST}}>
            {children}
        </DataContext.Provider>
    )
}

export function useData(){
    return useContext(DataContext)
}