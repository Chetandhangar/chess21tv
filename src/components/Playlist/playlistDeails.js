import {useData} from '../../context/data-context'
import {Link} from 'react-router-dom';
import ReactPlayer from 'react-player';
import {checkHistory} from '../../utils/utils'
import Modal from 'react-modal';
import { useState } from 'react';
import {useParams} from 'react-router-dom';
import {useVideo} from '../../context/video-context'

function RenderVideo({video}){
    console.log(video,'from prop pass as video to render')
    console.log("render",video)
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [playlistInput , setPlaylistInput] = useState("")

    const {dispatch, watchHistory, playlist} = useData();
    function handleWatchHistory(watchHistory, video){
        if(checkHistory(watchHistory, video)){
           return null;
    }
        else{
            return dispatch({ type : "ADD_TO_WATCH_HISTORY" ,payload : video})
        }
 
    }

    function closeModal(){
        setModalIsOpen(false)
    }

    function setHandleInputChange(event){
      
        setPlaylistInput(event.target.value)
        
    }
   
    return(
        <div key={video?.videolink}>
            {console.log(video,video.videolink,'where link lost')}
            <div>
            <ReactPlayer
                  width='100%'
                  height='360px'
                  controls
                  playing={true}
                  url={`https://www.youtube.com/watch?v=${video?.videolink}`}
                  onPlay={() => handleWatchHistory(watchHistory,video)}
               />
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
            <button onClick={() => setModalIsOpen(true)}>add To Playlist</button>
            { " "}
            <Modal
             isOpen={modalIsOpen}
             onRequestClose={closeModal}
             contentLabel="Example Modal"
            >
            <h1>Modal Header</h1>
            <button onClick={closeModal}>Close</button>
            <div>
            <div>
            {
                playlist.map((playlist) =>(
                    <div>
                        <button>{playlist.name}</button> 
                      
                    </div>
                ))
                }
            </div>
            <div>
                <input 
                value={playlistInput}
                onChange={setHandleInputChange}/>
           
            <button onClick={() => dispatch({
                type : "CREATE_NEW_PLAYLIST",
                payload : playlistInput
            })}>Create</button>
            </div> 
          
            </div>
              
            

            </Modal>
        </div>
    )
}

export const  PlaylistDetails = (props) => {
   const {videos} = useVideo();
   const {videolink} = useParams();
   const currentvideo = videos?.find((video) => video.videolink === videolink);
    console.log(videolink,'useparams')
    if(currentvideo !== null) 
    return(
        <div>
            <div>
                <Link to='/'>Home</Link>
            </div>
            <div>
                <RenderVideo video={currentvideo} />
            </div>
        </div>
    )
    else 
        return <div></div>
}