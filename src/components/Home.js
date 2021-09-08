import React from 'react';
import {useVideo} from '../context/video-context'
import { useData } from '../context/data-context'
import {Link} from 'react-router-dom';

export const Home = () =>{
    const {watchedLaterPlaylist} = useData();
    const {videos,loader} = useVideo();
    console.log(videos,'from videos')
    console.log(watchedLaterPlaylist, 'from home watchlater')
    return (
        <div>
            <div>
                {loader ? <p>Loading ...</p> :
                    <div>
                    {videos?.map((video) =>(
                    <div key={video.videolink}>
                        <Link to={`home/${video.videolink}`}>
                          <img 
                          src={video.thumbnail}
                          alt="Thumbnail"
                          />
                          <div>  
                          <img src={video.channelAvatar} alt="ChannelAvatar"/>
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