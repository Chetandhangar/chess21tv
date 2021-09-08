import React,{useState} from 'react'
import {Form, FormGroup, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {useAuth} from '../../context/auth-context'
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

    return(
        <div className="container">
            <Form onSubmit={handleLogin}>
                <FormGroup>
                    <Input 
                    type="text"
                    placeholder="username"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(username => username = e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Input 
                    type="password"
                    value={password}
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(password => password = e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button type="submit" value="submit" color="primary">Login</Button>
                </FormGroup>
                <FormGroup>
                    <p>Don't have an account <Link to="/signup">Signup</Link></p>
                </FormGroup>
                {loader && <p>Loading...</p>}
            </Form>
        </div>
    )
}