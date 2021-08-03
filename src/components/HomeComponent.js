
import { useData } from '../context/data-context'

export const Home = () =>{
    const { PLAYLIST } = useData();
    console.log(PLAYLIST)
    return (
        <div>
            <div>
                {PLAYLIST.map((video) =>(
                    <div key={video.id}>
                        <a 
                         href={`/home/${video.id}`}
                        >
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
                            </a>
                          <hr/>
                    </div>
                ))}
            </div>
        </div>
    )
}