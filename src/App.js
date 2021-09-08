import './App.css';
import { Home } from './components'
import {PlaylistDetails, WatchLater, LikeList, WatchHistory, Header,Signup,Login} from './components'
import { Routes,Route, Navigate} from 'react-router-dom'
import {useAuth} from './context/auth-context'




function App(){
  const {isUserLogin} = useAuth();

  function PrivateRoute({path,login,...props}){
    return login? <Route path={path} {...props}/>:<Navigate state={{from:path}} replace to="/login"/>
  }
  return (
    <div className="App">
      <div>
          <Header />
          <Routes>
          <Route exact path='/' element={<Home />}/>
            <Route exact path='/home/:videolink' element={<PlaylistDetails />}/>
            <PrivateRoute exact path='/watchlater' login={isUserLogin} element={<WatchLater />}/>
            <PrivateRoute exact path='/likevideos' login={isUserLogin} element={<LikeList/>}/>
            <PrivateRoute exact path='/history' login={isUserLogin} element={<WatchHistory/>}/>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
