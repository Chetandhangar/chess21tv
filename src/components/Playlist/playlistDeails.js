import {useData} from '../../context/data-context'
import ReactPlayer from 'react-player';
import {checkHistory} from '../../utils/utils'
import { useState } from 'react';
import {useParams} from 'react-router-dom';
import {useVideo} from '../../context/video-context';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid ,Card,CardHeader,Avatar,CardContent,CssBaseline,Collapse,Typography,
 IconButton,CardActions} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';




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
      paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
}))


function RenderVideo({video}){
    console.log(video,'from prop pass as video to render')
    console.log("render",video)
    const classes = useStyles();
    const { watchHistory,addToLikeVideo, addToWatchLater,addToWatchHistory} = useData();
    
    function handleWatchHistory(watchHistory, video){
        if(checkHistory(watchHistory, video)){
           return null;
    }
        else{
            return addToWatchHistory(video)
        }
 
    }

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

   
   
    return(
        <Container component="main">
            <CssBaseline>
                <div className={classes.paper}>
                 <Grid item xs={12} md={6}  style={{marginTop : "2rem"}}>
                 <Card className={classes.root}>
                 <ReactPlayer
                  width={classes.root}
                  height='300px'
                  controls
                  playing={true}
                  url={`https://www.youtube.com/watch?v=${video?.videolink}`}
                  onPlay={() => handleWatchHistory(watchHistory,video)}
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
                   <CardContent>
                        <CardActions  disableSpacing>
                            <IconButton 
                            onClick={() => addToLikeVideo(video)}
                            >
                                <ThumbUpIcon  />
                            </IconButton>
                            <IconButton onClick={() => addToWatchLater(video)}>
                                <WatchLaterIcon />
                            </IconButton>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                                >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Typography paragraph>
                            {video?.description}
                        </Typography>
                        </Collapse>
                   </CardContent>
                  
                 </Card>
                </Grid>
                </div>
            </CssBaseline>
        
        </Container>
    )
}

export const  PlaylistDetails = (props) => {
   const {videos} = useVideo();
   const {videolink} = useParams();
   const currentvideo = videos?.find((video) => video.videolink === videolink);
    console.log(videolink,'useparams')
    if(currentvideo !== null) 
    return(
        <div>
            <div>
                <RenderVideo video={currentvideo} />
            </div>
        </div>
    )
    else 
        return <div></div>
}