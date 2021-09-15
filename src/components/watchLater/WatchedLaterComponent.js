import {useEffect,useState} from 'react';
import { useData} from '../../context/data-context';
import {useAuth} from '../../context/auth-context'
import axios from 'axios';

export const WatchLater = () =>{
    const [loader ,setLoader] = useState(false)
    const {watchedLaterPlaylist , dispatch, removeFromWatchLater} = useData()
    console.log(watchedLaterPlaylist, 'from watch later list ')
    const {token} = useAuth();
    const userurl = "https://tv-chess21.chetandhangar.repl.co/user";
    useEffect(() => {
        (async() => {
            try{
                setLoader(true)
                const response = await axios.get(`${userurl}/watchlater`,{
                    headers : {authorization : token}
                })
                console.log(response,'from server watchlater')
                if(response.status === 200){
                    setLoader(false)
                    dispatch({
                        type : "UPDATE_WATCH_LATER",
                        payload : response.data.watchlater
                    })
                }
            }catch(error){
                console.log(error);
                setLoader(false)
            }
            
        })()
    },[token,dispatch])
    return (
        <div>
            WatchList
            <div>
                {loader ? <p>Loading ....</p> : 
                <div>
                    {watchedLaterPlaylist?.length <=0 &&<p>No videos in watch later</p> }
                     {watchedLaterPlaylist?.map((video) =>(
                    <div key={video._id}>
                        <h1>{video.title}</h1>
                        <button onClick={() =>  removeFromWatchLater(video)}>Remove from WatchList</button>
                    </div>
                ))}
                </div>
                }
               
            </div>
        </div>
    )
  
}
