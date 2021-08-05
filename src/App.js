import './App.css';
import { Home } from './components'
import {PlaylistDetails, WatchLater, LikeList} from './components'
import { BrowserRouter as Router , Switch, Route, Redirect} from 'react-router-dom';
import {useData} from './context/data-context'

function App(){

  const {PLAYLIST} = useData()

  function videoWithId({match}){
    return(
      <PlaylistDetails video={PLAYLIST.filter((video) => video.id === match.params.videoId)[0]}/>
    )
  }


  return (
    <div className="App">
      <div>
        <h1>Chess21 Tv</h1>
      </div>
      <div>
        <Router>
          <Switch>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/home/:videoId' component={videoWithId}/>
            <Route exact path='/watchlater' component={WatchLater}/>
            <Route exact path='/likelist' component={LikeList}/>
            <Redirect to='/home'/>
          </Switch>
        </Router>
       
      </div>
    </div>
  );
}

export default App;
