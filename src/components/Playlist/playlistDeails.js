import {useData} from '../../context/data-context'
import {Link} from 'react-router-dom'

function RenderVideo({video}){
    const {dispatch, watchedLaterPlaylist} = useData();
    console.log(watchedLaterPlaylist)
    return(
        <div key={video.id}>
            <div>
                <img src={video.thumbnail}/>
            </div>
            <div>
                <img src={video.channelAvatar}/>   <h3>{video.title}</h3>    
            </div>
            <div>
                <h5>{video.publishedDate}</h5>
            </div>
            <div>
            <button onClick={() => dispatch({
                type : "ADD_TO_LIKE",
                payload : video
            })}>like</button>
            {" "}
            <button onClick={() => dispatch({
                type : "ADD_TO_WATCHED_LATER",
                payload : video
            })}>Watched Later</button>
            </div>
        </div>
    )
}

export const  PlaylistDetails = (props) => {
    console.log(props.video, 'from plailist')
    if(props.video !== null) 
    return(
        <div>
            <div>
                <Link to='/home'>Home</Link>
            </div>
            <div>
                <RenderVideo video={props.video} />
            </div>
        </div>
    )
    else 
        return <div></div>
}