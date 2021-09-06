import {Link} from 'react-router-dom'
export const Header = () =>{
    return(
        <div>
            <div>
            <nav>
                <Link to='/watchlater'> Watch Later</Link>      
              </nav>
              <nav>
                <Link to='/likelist'> likelist</Link>      
              </nav>
              <nav>
                <Link to='/history'> History</Link>      
              </nav>
            </div>
        </div>
    )
}