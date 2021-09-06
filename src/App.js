import './App.css';
import { Home } from './components'
import {PlaylistDetails, WatchLater, LikeList, WatchHistory, Header} from './components'
import { Routes,Route} from 'react-router-dom';
import {useData} from './context/data-context';

function App(){
  return (
    <div className="App">
      <div>
        <h1>Chess21 Tv</h1>
      </div>
      <div>
          <Header />
          <Routes>
          <Route exact path='/' element={<Home />}/>
            <Route exact path='/home/:videolink' element={<PlaylistDetails />}/>
            <Route exact path='/watchlater' element={<WatchLater />}/>
            <Route exact path='/likelist' element={<LikeList/>}/>
            <Route exact path='/history' element={<WatchHistory/>}/>
          </Routes>
        
       
      </div>
    </div>
  );
}

export default App;
