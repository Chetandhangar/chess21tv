import React,{useState} from 'react';
import {useVideo} from '../context/video-context'
import { useData } from '../context/data-context'
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import {Container, Grid ,Card,CardHeader,Avatar,CardMedia,CardContent,Typography,
   Collapse ,IconButton,CardActions} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    const [expanded, setExpanded] = useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
       <Container component="main" className={classes.productContainer}>
           <Grid container spacing={3}>
                {loader && <p>Loading...</p>}
                {videos?.map((video) =>(
                    <Grid item key={video?.videolink} xs={12} sm={6} md={4}>
                        <Link to={`home/${video.videolink}`}>
                        <Card className={classes.root}>
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
                            title="Paella dish"
                        />
                        <CardContent>
                        <CardActions  disableSpacing>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {video?.publishedDate}
                        </Typography>
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
                        <Typography variant="body2" color="textSecondary" component="p">
                          {video?.description}
                        </Typography>
                        </Collapse>
                        </CardContent>
                    </Card>
                    </Link>
                    </Grid>
                ))}
           </Grid>

       </Container>
    )
}

