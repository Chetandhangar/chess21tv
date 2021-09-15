import {useEffect,useState} from 'react'
import { useData } from '../../context/data-context'
import axios from "axios";
import {useAuth} from '../../context/auth-context';

export  const WatchHistory = () =>{
    const [loader , setLoader] = useState(false)
    const { watchHistory : HistoryPlaylist, dispatch, removeFromWatchHistory} =  useData();
    const {token} = useAuth();
    const userurl = "https://tv-chess21.chetandhangar.repl.co/user";
    useEffect(() => {
        (async() => {
            try{
                setLoader(true)
                const response = await axios.get(`${userurl}/watchhistory`,{
                    headers : {authorization : token}
                })
                console.log(response,'from server watchhistory')
                if(response.status === 200){
                    setLoader(false)
                    dispatch({
                        type : "UPDATE_WATCH_HISTORY",
                        payload : response.data.watchhistory
                    })
                }
            }catch(error){
                console.log(error);
                setLoader(false)
            }
            
        })()
    },[token,dispatch])
    

    return(
        <div>
            <div>
                Watch History
            </div>
            <div>
                {loader ? <p>Loading ...</p> : 
                <div>
                    {HistoryPlaylist.length <= 0 && <p>No vidos in Watch History</p>}
                     {HistoryPlaylist?.map((video) =>(
                    <div key ={video.id}>
                        <h1>{video.title}</h1>
                        <button onClick={() => removeFromWatchHistory(video)}>Remove From List</button>
                    </div>
                ))}
                </div>
                }
               
            </div>
        </div>
    )
}