import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import {useAuth} from '../../context/auth-context';
import {useStyles} from './HeaderStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HistoryIcon from '@material-ui/icons/History';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Home from '@material-ui/icons/Home';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import {useNavigate} from 'react-router-dom'

export const Header = () =>{
  const {isUserLogin , logout}  = useAuth()
  const classes = useStyles();
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

 const isMenuOpen = Boolean(anchorEl);
 const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

 const handleProfileMenuOpen = (event) => {
   setAnchorEl(event.currentTarget);
 };

 const handleMobileMenuClose = () => {
   setMobileMoreAnchorEl(null);
 };

 const handleMenuClose = () => {
   setAnchorEl(null);
   handleMobileMenuClose();
 };

 const handleMobileMenuOpen = (event) => {
   setMobileMoreAnchorEl(event.currentTarget);
 };

 const handleLogin = () => {
    navigate("/login")
 }


 const menuId = 'primary-search-account-menu';
 const renderMenu = (
   <Menu
     anchorEl={anchorEl}
     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
     id={menuId}
     keepMounted
     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
     open={isMenuOpen}
     onClose={handleMenuClose}
   >
       {
           isUserLogin ? (
            <MenuItem onClick={() =>  logout()}>Logout</MenuItem>
           ) : 
           (
            <MenuItem onClick={() => handleLogin()}>SignIn</MenuItem>
           )
       }
    
  
   </Menu>
 );

 const mobileMenuId = 'primary-search-account-menu-mobile';
 const renderMobileMenu = (
   <Menu
     anchorEl={mobileMoreAnchorEl}
     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
     id={mobileMenuId}
     keepMounted
     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
     open={isMobileMenuOpen}
     onClose={handleMobileMenuClose}
   >
     <MenuItem>
     <Link to="/history" style={{color : "black", cursor : "pointer"}}>
                <IconButton aria-label="show history" color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <HistoryIcon/>
                </Badge>
                </IconButton>
            </Link>
       <p>History</p>
     </MenuItem>
     <MenuItem>
     <Link to="/watchlater"  style={{color : "black", cursor : "pointer"}}>
                <IconButton aria-label="show watch later" color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <WatchLaterIcon/>
                </Badge>
                </IconButton>
            </Link>
       <p>Watch Later</p>
     </MenuItem>
     <MenuItem>
     <Link to="/likevideos"  style={{color : "black"}}>
                <IconButton aria-label="show history" color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <ThumbUpIcon />
                </Badge>
                </IconButton>
            </Link>
       <p>Like Videos</p>
     </MenuItem>
     <MenuItem onClick={handleProfileMenuOpen}>
       <IconButton
         aria-label="account of current user"
         aria-controls="primary-search-account-menu"
         aria-haspopup="true"
         color="inherit"
       >
         <AccountCircle />
       </IconButton>
       <p>Profile</p>
     </MenuItem>
   </Menu>
 );

  
  return(
    <div className={classes.grow}>
         <AppBar position="static">
         <Toolbar>
         <Link to="/"  style={{color : "white"}}>
         <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
              <Home />
          </IconButton>
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            TV-Chess21
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Videos"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
             <Link to="/history"  style={{color : "white"}}>
                <IconButton aria-label="show history" color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <HistoryIcon/>
                </Badge>
                </IconButton>
            </Link>
            <Link to="/watchlater"  style={{color : "white"}}>
                <IconButton aria-label="show watch later" color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <WatchLaterIcon/>
                </Badge>
                </IconButton>
            </Link>
            <Link to="/likevideos"  style={{color : "white"}}>
                <IconButton aria-label="show history" color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <ThumbUpIcon />
                </Badge>
                </IconButton>
            </Link>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
         </Toolbar>
         </AppBar>
         {renderMobileMenu}
         {renderMenu}
    </div>
        
    )
}

/*
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

*/