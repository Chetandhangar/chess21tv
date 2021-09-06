import {Link} from 'react-router-dom'
import { useData } from '../../context/data-context'
export  const WatchHistory = () =>{

    const { watchHistory : HistoryPlaylist, dispatch} =  useData();
    

    return(
        <div>
            <Link to='/home'>Home</Link>
            <div>
                Watch History
            </div>
            <div>
                {HistoryPlaylist.map((video) =>(
                    <div key ={video.id}>
                        <h1>{video.title}</h1>
                        <button onClick={() => dispatch({
                            type : "REMOVE_FROM_WATCH_HISTORY",
                            payload : video
                        })}>Remove From List</button>
                    </div>
                ))}
            </div>
        </div>
    )
}