import {useData} from '../../context/data-context';
import {Link} from 'react-router-dom';

export const LikeList = () =>{
    const {likeList,dispatch} = useData()
 return(
     <div>
         <div>
             <Link to='/'>Back</Link>
         </div>
         <div>
             LikeList
         </div>
         <hr/>
         <div>
            {likeList.map((video) =>(
                <div key={video.id}>
                    <h1>{video.title}</h1>
                    <button onClick={() => dispatch({
                        type : "REMOVE_FROM_LIKE_LIST",
                        payload : video
                    })}>Remove From list</button>
                </div>
            ))}
         </div>
     </div>
 )
}