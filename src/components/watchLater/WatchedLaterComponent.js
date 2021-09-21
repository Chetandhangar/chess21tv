import React,{useEffect,useState} from 'react';
import { useData} from '../../context/data-context';
import {useAuth} from '../../context/auth-context'
import axios from 'axios';

import {Container, Grid ,Card,CardHeader,Avatar,CardMedia,CardContent,Typography,
  IconButton,CardActions} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {Link} from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';

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

export const WatchLater = () =>{
    const [loader ,setLoader] = useState(false)
    const {watchedLaterPlaylist , dispatch, removeFromWatchLater} = useData()
    console.log(watchedLaterPlaylist, 'from watch later list ')
    const {token} = useAuth();
    const userurl = "https://tv-chess21.chetandhangar.repl.co/user";

    const classes = useStyles();

    useEffect(() => {
        (async() => {
            try{
                setLoader(true)
                const response = await axios.get(`${userurl}/watchlater`,{
                    headers : {authorization : token}
                })
                console.log(response,'from server watchlater')
                if(response.status === 200){
                    setLoader(false)
                    dispatch({
                        type : "UPDATE_WATCH_LATER",
                        payload : response.data.watchlater
                    })
                }
            }catch(error){
                console.log(error);
                setLoader(false)
            }
            
        })()
    },[token,dispatch])
    return (
        <Container component="main" className={classes.productContainer}>
        <Grid container spacing={3}>
             {loader ? ( <p>Loading...</p>) : (
                 <>
                 {watchedLaterPlaylist?.length <= 0 && <Typography>No videos in watch later</Typography> }
                    {watchedLaterPlaylist?.map((video) =>(
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
                     onClick={() => removeFromWatchLater(video)}
                     >
                        <DeleteIcon style={{ color: "red"}} />
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
