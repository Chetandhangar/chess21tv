import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import {Navbar,NavbarBrand,NavItem,NavbarToggler,Nav,Collapse,Button} from 'reactstrap';
import {useAuth} from '../../context/auth-context';

export const Header = () =>{
  const [isNavOpen, setNavOpen] = useState(false)
  const {isUserLogin , logout}  = useAuth()
  function toggleNav(){
    setNavOpen(isNavOpen => isNavOpen = !isNavOpen)
  }
  
  return(
        <React.Fragment>
              <Navbar dark color="primary" expand="md">
                <div className="container">
                <NavbarToggler onClick={toggleNav}></NavbarToggler>
                    <NavbarBrand>Chess21</NavbarBrand>
                    <Collapse isOpen={isNavOpen} navbar>
                    <Nav navbar>
                      <NavItem >
                          <Link className="nav-link" to='/' style={{cursor : "pointer"}}>
                              <span className="fa fa-home fa-lg"></span>Home</Link>
                      </NavItem>
                      <NavItem >
                            <Link className="nav-link" to='/history' style={{cursor : "pointer"}}>
                                <span className="fa fa-history fa-lg">History</span></Link>
                        </NavItem>
                        <NavItem >
                            <Link className="nav-link" to='/likevideos' style={{cursor : "pointer"}}>
                                <span className="fa fa-thumbs-up fa-lg">Liked</span></Link>
                        </NavItem>
                        <NavItem >
                            <Link className="nav-link" to='/watchlater' style={{cursor : "pointer"}}>
                                <span className="fa fa-clock-o fa-lg">Later</span></Link>
                        </NavItem>
                        <NavItem >
                            {isUserLogin ? 
                            <Button onClick={() => logout()}>
                                <span className="fa fa-sign-out fa-lg">Logout</span>
                            </Button> : 
                             <Link className="nav-link" to='/login' style={{cursor : "pointer"}}>
                             <span className="fa fa-sign-in fa-lg">Login</span></Link>
                            } 
                        </NavItem>
                    </Nav>
                  </Collapse> 
                </div>
            </Navbar>
        </React.Fragment>
        
    )
}