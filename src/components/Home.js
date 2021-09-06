import React from 'react';
import {useVideo} from '../context/video-context'
import { useData } from '../context/data-context'
import {Link} from 'react-router-dom';
export const Home = () =>{
    const { PLAYLIST, watchedLaterPlaylist} = useData();
    const {videos,error,loader} = useVideo();
    console.log(videos,'from videos')
    console.log(watchedLaterPlaylist, 'from home watchlater')
    return (
        <div>
          <div>
            
          </div>
            <br />
            <br />
            <div>
                {loader ? <p>Loading ...</p> :
                    <div>
                    {videos?.map((video) =>(
                    <div key={video.videolink}>
                        <Link to={`home/${video.videolink}`}>
                            {console.log(video.videolink)}
                          <img 
                          src={video.thumbnail}
                          />
                          <div>  
                          <img src={video.channelAvatar}/>
                          <h4>{video.title}</h4>
                          </div>
                          <div>
                              <h5>{video.channelName}</h5>
                          </div>
                          <div>
                              {video.publishedDate}
                          </div>
                            </Link>
                          <hr/>
                         
                    </div>
                ))}
                    </div>
                }
              
            </div>
        </div>
    )
}