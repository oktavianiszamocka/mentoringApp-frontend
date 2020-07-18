import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import TodayRoundedIcon from '@material-ui/icons/TodayRounded';
import CollectionsRoundedIcon from '@material-ui/icons/CollectionsRounded';

//zmiana
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }
  }));
const NavBar = () => {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    const toggleDrawer = (side, open) => event => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [side]: open });
    };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
        <List>
          <ListItem button component={Link} to="/Wardrobe">      
            <ListItemIcon> <CollectionsRoundedIcon /></ListItemIcon>
            <ListItemText primary={'Wardrobe'} />
          </ListItem> 
          <ListItem button component={Link} to="/Suitcases">   
            <ListItemIcon> <WorkRoundedIcon /></ListItemIcon>
            <ListItemText primary={'Suitcases'} />
          </ListItem>
          <ListItem button component={Link} to="/TodaysSet">    
            <ListItemIcon> <TodayRoundedIcon /></ListItemIcon>   
            <ListItemText primary={"Today's set"} />
          </ListItem>
          <ListItem button component={Link} to="/PlanTrip">      
            <ListItemIcon> <CalendarTodayRoundedIcon /></ListItemIcon>
            <ListItemText primary={'Plan Trip'} />
          </ListItem>
          <ListItem button component={Link} to="/AddCloth">   
            <ListItemIcon> <AddRoundedIcon /></ListItemIcon>
            <ListItemText primary={'Add Cloth'} />
          </ListItem>
        </List>
    </div>
  );
    return(   
        <div>
            <AppBar position="static">
              <Toolbar>
                <IconButton onClick={toggleDrawer('left', true)}   edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >
                      <MenuIcon />
                </IconButton>
                <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                  {sideList('left')}
                </Drawer> 
                <Typography variant="h3" className={classes.title} >
                </Typography>
                {auth && (
                  <div>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"   
                    >
                    <AccountCircle />
                    </IconButton>
                      <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                  >   
                    <Link to="/Profile">
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </Link>
                    <Link to="/MyAccount">
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Link>
                    </Menu>
                   </div>
                )}         
              </Toolbar>          
            </AppBar>
        </div>
    )
}
export default NavBar;