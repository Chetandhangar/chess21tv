import React , {useState, createContext,useContext} from 'react';
import axios from 'axios'
import {useNavigate, useLocation} from 'react-router-dom'
export const AuthContext = createContext();


export function AuthProvider({children}){
    const { isUserLoggedIn, token: savedToken , username} = JSON.parse(
        localStorage?.getItem("login")
      ) || { isUserLoggedIn: false, token: null , username : ""};
    
 


    const [isUserLogin , setUserLogin] = useState(isUserLoggedIn)
    const [token , setToken] = useState(savedToken);
    const [loader , setLoader] = useState(false);
    const [user , setUser] = useState(username) 
    const navigate = useNavigate();
    const {state} = useLocation();
    const userurl = "https://tv-chess21.chetandhangar.repl.co/user";
    console.log(isUserLogin,'from staet')
    
    async function signupService(email,username,password){
     return await axios.post(`${userurl}/signup`,{
         email,
         username,
         password
     })
    }

    async function loginService(username, password){
        return await axios.post(`${userurl}/login`, {
            username,
            password
        })
    }

    async function signUpWithCredentials(email,username,password){
          try{
              setLoader(true)
            const response  = await signupService(email,username,password)
            if(response.status === 200){
                setLoader(false);
                alert(response.data.message)
                navigate('/login')
            

            }
          }catch(error){
              console.log(error)
              alert(error)
              setLoader(false)
          }
    }

    async function loginWithCredentials(username, password){
        try{
            setLoader(true)
            const response = await loginService(username,password);
            if(response.status === 200){
                loginUser(response.data);
                setLoader(false);
            }
        }catch(error){
            console.log(error)
        }
        
    }
    function loginUser({token,username,userId}){
        setUserLogin(true);
        setToken(token)
        localStorage?.setItem("login",JSON.stringify({isUserLoggedIn : true,token, username,userId}));
        state != null ? navigate(state.from) : navigate('/')
    }

    function logout(){
        setUserLogin(false)
        setToken(null)
        localStorage?.removeItem("login")
        return navigate('/login')
    }
    return(
        <AuthContext.Provider value={{isUserLogin,setUserLogin,
        logout,
        user , setUser,
        token, setToken, 
        signUpWithCredentials,
        loader,setLoader,
        loginWithCredentials,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}