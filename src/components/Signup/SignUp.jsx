import React,{useState} from 'react';
import {useAuth} from '../../context/auth-context';
import {Container,CssBaseline,Avatar,Typography,TextField,Button} from '@material-ui/core';
import useStyles from '../materialStyle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Link} from 'react-router-dom'

export const Signup = () => {
    const [username , setUsername] = useState("");
    const [email ,setEmail] = useState("");
    const [password , setPassword] = useState("")
    const {signUpWithCredentials, loader} = useAuth();
    const classes = useStyles();

     function handleSubmit(e){
        e.preventDefault();
        signUpWithCredentials(email,username,password)
        setEmail("")
        setUsername("")
        setPassword("") 
    }


    return(
        <Container component="main" maxWidth="xs">
                <CssBaseline>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
    
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail((email) => email = e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername((username) => username = e.target.value)}
                        />
                        
                         <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword((password) => password = e.target.value)}
                        />
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                           {loader ? "Registering..." : "Sign In"}
                        </Button>
                        <Typography>
                        <Link to="/login" variant="body2">
                            {"Already have an account ? Sign In"}
                        </Link>
                        </Typography>
                        </form>
                    </div>
                </CssBaseline>
            </Container>
    )
}