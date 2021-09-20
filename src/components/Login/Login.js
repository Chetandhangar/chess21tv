import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import {useAuth} from '../../context/auth-context'
import {Container,CssBaseline,Avatar,Typography,TextField,Button} from '@material-ui/core';
import useStyles from '../materialStyle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

export const Login = () => {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const {loginWithCredentials, loader} = useAuth();
    function handleLogin(e){
        e.preventDefault();
        loginWithCredentials(username,password)
        setUsername("")
        setPassword("")
    }

    const classes = useStyles()

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
    
                        <form className={classes.form} noValidate onSubmit={handleLogin}>
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
                           {loader ? "Signing..." : "Sign In"}
                        </Button>
                        <Typography>
                        <Link to="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                        </Typography>
                        </form>
                    </div>
                </CssBaseline>
            </Container>
    )
}