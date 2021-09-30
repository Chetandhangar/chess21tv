import React from 'react';
import {useVideo} from '../context/video-context'
import { useData } from '../context/data-context'
import {Link} from 'react-router-dom';
import {Container, Grid ,Card,CardHeader,Avatar,CardMedia} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


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

export const Home = () =>{
    const {watchedLaterPlaylist} = useData();
    const {videos,loader} = useVideo();
    console.log(videos,'from videos')
    console.log(watchedLaterPlaylist, 'from home watchlater');
    const classes = useStyles();
  

    return (
       <Container component="main" className={classes.productContainer}>
           <Grid container spacing={3}>
                {loader && <p>Loading...</p>}
                {videos?.map((video) =>(
                    <Grid item key={video?.videolink} xs={12} sm={6} md={4}>
                       
                        <Card className={classes.root}>
                        <Link to={`home/${video.videolink}`}>
                         <CardMedia
                            className={classes.media}
                            image={video?.thumbnail}
                            title="Paella dish"
                        />
                         <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                              <img src={video?.channelAvatar} alt="Avatar"/>
                            </Avatar>
                            }
                            title={video?.channelName}
                            subheader={video?.title}
                        />
                        </Link>
                    </Card>
                    </Grid>
                ))}
           </Grid>

       </Container>
    )
}

