import {useEffect, useState} from 'react'
import {useData} from '../../context/data-context';
import axios from 'axios';
import {useAuth} from '../../context/auth-context';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid ,Card,CardHeader,Avatar,CardMedia,CardContent,
 IconButton,CardActions} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import {Link} from 'react-router-dom';


export const useStyles = makeStyles((theme) => ({
    productContainer : {
        marginTop : "3rem"
    },
    root: {
        maxWidth: 345,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: ""
      },
}))



export const LikeList = () =>{
    const [loader , setLoader] = useState(false)
    const {likeList,dispatch,removeFromLikeVideo} = useData();
    const {token} = useAuth();
    console.log(token)
    const classes = useStyles()
    const userurl = "https://tv-chess21.chetandhangar.repl.co/user";
   
    useEffect(() => {
        (async() => {
            try{
                setLoader(true)
               const response = await axios.get(`${userurl}/likedvideos`,{
                    headers : {authorization : token}
                })
               console.log(response,'from liked videos from server')
               if(response.status === 200){
                   setLoader(false)
                   dispatch({
                       type : "UPDATE_LIKE_LIST",
                       payload :response.data.likedvideos
                   })
               }
            }catch(error){
                setLoader(false)
                console.log(error,'like error fetch');
            }
        })();
    },[dispatch,token])
  return( 
    <Container component="main" className={classes.productContainer}>
    <Grid container spacing={3}>
        {loader ? (<p>Loading ...</p>) : (
            <>
           {likeList?.length <= 0 && <p>No videos in Watch History</p>}
           {likeList?.map((video) => (
                   <Grid item key={video?.videolink} xs={12} sm={6} md={4}>
                   <Card className={classes.root}>
                   <Link to={`home/${video.videolink}`}>
                   <CardHeader
                       avatar={
                       <Avatar aria-label="recipe" className={classes.avatar}>
                         <img src={video?.channelAvatar} alt="Avatar"/>
                       </Avatar>
                       }
                       title={video?.channelName}
                       subheader={video?.title}
                   />
                    <CardMedia
                       className={classes.media}
                       image={video?.thumbnail}
                       title="Thumbnai"
                   />
                  </Link>
                   <CardContent>
                   <CardActions  disableSpacing>
                   <IconButton 
                   onClick={() => removeFromLikeVideo(video)}
                   >
                      <ThumbUpIcon  />{"liked"}
                   </IconButton>
                   </CardActions>
                   </CardContent>
               </Card>
               </Grid>
           ))}
            </>
        )}
    </Grid>
  </Container>
 )

}