import {useEffect} from 'react'
import {useData} from '../../context/data-context';
import axios from 'axios';
import {useAuth} from '../../context/auth-context'
export const LikeList = () =>{
    const {likeList,dispatch,removeFromLikeVideo} = useData();
    const {token} = useAuth();
    console.log(token)
    const userurl = "https://tv-chess21.chetandhangar.repl.co/user";
   
    useEffect(() => {
        (async() => {
            try{
               const response = await axios.get(`${userurl}/likedvideos`,{
                    headers : {authorization : token}
                })
               console.log(response,'from liked videos from server')
               if(response.status === 200){
                   dispatch({
                       type : "UPDATE_LIKE_LIST",
                       payload :response.data.likedvideos
                   })
               }
            }catch(error){
                console.log(error,'like error fetch');
            }
        })();
    },[dispatch,token])
 return( 
     <div>
         <div>
             LikeList
         </div>
         <hr/>
         <div>
            {likeList?.map((video) =>(
                <div key={video._id}>
                    <h1>{video.title}</h1>
                    <button onClick={() => removeFromLikeVideo(video)}>Remove From list</button>
                </div>
            ))}
         </div>
     </div>
 )
}