import {useEffect} from 'react';
import { useData} from '../../context/data-context';
import {useAuth} from '../../context/auth-context'
import axios from 'axios';

export const WatchLater = () =>{
    const {watchedLaterPlaylist , dispatch, removeFromWatchLater} = useData()
    console.log(watchedLaterPlaylist, 'from watch later list ')
    const {token} = useAuth();
    const userurl = "https://tv-chess21.chetandhangar.repl.co/user";
    useEffect(() => {
        (async() => {
            try{
                const response = await axios.get(`${userurl}/watchlater`,{
                    headers : {authorization : token}
                })
                console.log(response,'from server watchlater')
                if(response.status === 200){
                    dispatch({
                        type : "UPDATE_WATCH_LATER",
                        payload : response.data.watchlater
                    })
                }
            }catch(error){
                console.log(error)
            }
            
        })()
    },[token,dispatch])
    return (
        <div>
            WatchList
            <div>
                {watchedLaterPlaylist?.map((video) =>(
                    <div key={video._id}>
                        <h1>{video.title}</h1>
                        <button onClick={() =>  removeFromWatchLater(video)}>Remove from WatchList</button>
                    </div>
                ))}
            </div>
        </div>
    )
  
}
