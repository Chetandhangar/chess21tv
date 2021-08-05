
import { useData } from '../context/data-context'
import {Link} from 'react-router-dom'
export const Home = () =>{
    const { PLAYLIST, watchedLaterPlaylist} = useData();
    console.log(PLAYLIST)
    console.log(watchedLaterPlaylist, 'from home watchlater')
    return (
        <div>
          <div>
              <nav>
                <Link to='/watchlater'> Watch Later</Link>      
              </nav>
              <nav>
                <Link to='/likelist'> likelist</Link>      
              </nav>
              <nav>
                <Link to='/history'> History</Link>      
              </nav>
          </div>
            <br />
            <br />
            <div>
                {PLAYLIST.map((video) =>(
                    <div key={video.id}>
                        <Link to={`home/${video.id}`}>
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
        </div>
    )
}