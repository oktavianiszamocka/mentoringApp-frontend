import React from 'react';
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button';
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
    return(   
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h3" className={classes.title} >
          </Typography>
           <Link to="/SideLogin">
              <Button variant="contained" >
                Login
              </Button>
          </Link>
        </Toolbar>
    </AppBar>
    </div>
    )
}
export default NavBar;