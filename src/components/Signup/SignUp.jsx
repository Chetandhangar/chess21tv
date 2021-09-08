import React,{useState} from 'react';
import {Form ,FormGroup,Input,Button} from 'reactstrap';
import {useAuth} from '../../context/auth-context'
export const Signup = () => {
    const [username , setUsername] = useState("");
    const [email ,setEmail] = useState("");
    const [password , setPassword] = useState("")
    const {signUpWithCredentials} = useAuth();

     function handleSubmit(e){
        e.preventDefault();
        signUpWithCredentials(email,username,password)
        setEmail("")
        setUsername("")
        setPassword("") 
    }

    return(
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input 
                    name ="username"
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(username => username =  e.target.value)}
                    id="username"
                    />
                </FormGroup>
                <FormGroup>
                    <Input 
                    type = "text"
                    name ="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(email => email =  e.target.value)}
                    id="email"
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                    type = "password" 
                    name ="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(password => password =  e.target.value)}
                    id="password"
                    />
                </FormGroup>
                <FormGroup className="btn-group">
                <Button className="btn-signup" type="submit" value="submit" color="primary">Signup</Button>
                </FormGroup>
            </Form>
        </div>
    )
}