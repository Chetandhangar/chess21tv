import { useData} from '../../context/data-context'
import {  Link } from 'react-router-dom'
/*export function RenderWatchLaterVideo(playList){
    return(
        <div>
            <div>
                {playList.map((video) =>(
                    <div key={video.id}>
                        <div>
                            <img src={video.thumbnail}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
*/
export const WatchLater = () =>{
    const {watchedLaterPlaylist , dispatch} = useData()
    console.log(watchedLaterPlaylist, 'from watch later list ')
    return (
        <div>
            <div>
                <Link to='/home'>Home</Link>
            </div>
            <br/>
            <br/>
            <div>
                {watchedLaterPlaylist.map((video) =>(
                    <div key={video.id}>
                        <h1>{video.title}</h1>
                        <button onClick={() =>  dispatch({
                            type : "REMOVE_FROM_WATCHLIST",
                            payload : video
                        })}>Remove from WatchList</button>
                    </div>
                ))}
            </div>
        </div>
    )
  
}
//<RenderWatchLaterVideo watchedLaterPlaylist={watchedLaterPlaylist}/>