import { useData} from '../../context/data-context'

export const WatchLater = () =>{
    const {watchedLaterPlaylist , dispatch} = useData()
    console.log(watchedLaterPlaylist, 'from watch later list ')
    return (
        <div>
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
