import React , {createContext, useContext, useEffect,useState} from 'react';
import axios from 'axios';

const VideoContext = createContext();

export function VideoProvider({children}){
    const [videos , setVideos] = useState([])
    const [loader , setLoader] = useState(false)
    const [error, setError] = useState(false)
    const videourl = "https://tv-chess21.chetandhangar.repl.co/video";

    useEffect(() => {
        (async() => {
            try{
                setLoader(true)
                const response = await axios.get(videourl)
                if(response.status === 200){
                   setVideos(response.data.videos)
                    setLoader(false)
                }
            }catch(error){
                console.log(error)
                setLoader(false)
                setError(error.response)
            }
          
        })();
    },[])

    return(
        <VideoContext.Provider value={{videos,setVideos,loader,setLoader,error}}>
            {children}
        </VideoContext.Provider>
    )
}

export function useVideo(){
    return useContext(VideoContext)
}