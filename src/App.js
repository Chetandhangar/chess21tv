import './App.css';
import { Home } from './components'
import {PlaylistDetails} from './components'
import { BrowserRouter as Router , Switch, Route, Redirect} from 'react-router-dom';
import {useData} from './context/data-context'

function App(){

  const {PLAYLIST} = useData()

  function videoWithId({match}){
    console.log(match, 'from with if')
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
            <Route exact path='/' component={Home}/>
            <Route exact path='/home/:videoId' component={videoWithId}/>
          </Switch>
        </Router>
       
      </div>
    </div>
  );
}

export default App;
