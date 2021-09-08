import {useEffect} from 'react'
import { useData } from '../../context/data-context'
import axios from "axios";
import {useAuth} from '../../context/auth-context';

export  const WatchHistory = () =>{
    const { watchHistory : HistoryPlaylist, dispatch, removeFromWatchHistory} =  useData();
    const {token} = useAuth();
    const userurl = "https://tv-chess21.chetandhangar.repl.co/user";
    useEffect(() => {
        (async() => {
            try{
                const response = await axios.get(`${userurl}/watchhistory`,{
                    headers : {authorization : token}
                })
                console.log(response,'from server watchhistory')
                if(response.status === 200){
                    dispatch({
                        type : "UPDATE_WATCH_HISTORY",
                        payload : response.data.watchhistory
                    })
                }
            }catch(error){
                console.log(error)
            }
            
        })()
    },[token,dispatch])
    

    return(
        <div>
            <div>
                Watch History
            </div>
            <div>
                {HistoryPlaylist?.map((video) =>(
                    <div key ={video.id}>
                        <h1>{video.title}</h1>
                        <button onClick={() => removeFromWatchHistory(video)}>Remove From List</button>
                    </div>
                ))}
            </div>
        </div>
    )
}