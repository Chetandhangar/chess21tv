
function RenderVideo({video}){
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
            <button>like</button>{" "}
            <button>Watched Later</button>
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
                <RenderVideo video={props.video} />
            </div>
        </div>
    )
    else 
        return <div></div>
}