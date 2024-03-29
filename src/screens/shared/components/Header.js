/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  AppBar, Toolbar, Popover, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Font from '../../../globals/font';
import Avatar from './Avatar';
import Api from '../../../api/index';
import InvitationPopOver from '../../Invitations/InvitationsPopOver';

const StyledImg = styled.img`
  width: 6rem;
  height: 5rem;
`;

const useStyles = makeStyles((theme) => ({
  logo: {},
  home: {
    fontFamily: 'sans-serif',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.3rem',
    fontWeight: 100,
    marginRight: '2rem',
  },
  home2: {
    '&:hover': {
      color: 'black',
    },
  },
  title: {
    fontFamily: Font.fontFamily,
    textDecoration: 'none',
  },
  title2: {
    '&:hover': {
      color: 'black',
    },
  },
  notifications: {
    fontFamily: Font.fontFamily,
    flexGrow: 1,
  },
  typography: {
    padding: theme.spacing(2),
  },
  popOverDiv: {
    width: '30rem',
    height: 'auto',
    maxHeight: '35rem',
    minHeight: '15rem',
  },

}));

const menuOptions = [
  {
    title: 'Main page',
    url: '../mainpage',
  },
  {
    title: 'Messages',
    url: '../message',
  },
  {
    title: 'My projects',
    url: '../myproject',
  },
];

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleOpenInvitationPopOver = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleCloseInvitationPopOver = () => {
    setAnchorEl2(null);
  };

  const open2 = Boolean(anchorEl2);
  const id = open2 ? 'simple-popover' : undefined;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('idUser');
    localStorage.removeItem('userRole');
  };

  const handleLogout = async (e) => {
    removeLocalStorage();
    window.location.href = '/login';
  };

  const [user, setUser] = useState();

  const loadData = async () => {
    const res = await Promise.all([Api.getUserAvaAndName()]);
    setUser(res[0].data.data);
  };

  useEffect(async () => {
    loadData();
  }, []);

  return (

    <AppBar position="fixed" color="white" elevation="3">
      <Toolbar style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className={classes.logo}>
          <a href="/mainpage">
            <StyledImg src="data:image/png;base64,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" />
          </a>
        </div>
        <div style={{ display: 'flex' }}>
          {menuOptions.map((m) => (
            <Typography key={m} variant="h5" className={classes.home} underlineNone>
              <Link
                href={m.url}
                className={classes.home2}
                color="inherit"
                style={{ textDecoration: 'none' }}
              >
                {m.title}
              </Link>
            </Typography>
          ))}
          <Typography variant="h5" className={classes.home} underlineNone>
            <Link
              variant="h5"
              component="button"
              className={classes.home2, classes.home}
              color="inherit"
              style={{ textDecoration: 'none' }}
              onClick={handleOpenInvitationPopOver}
            >
              Invitations
            </Link>
          </Typography>
          <Popover
            id={id}
            open={open2}
            anchorEl={anchorEl2}
            onClose={handleCloseInvitationPopOver}
            keepMounted
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div className={classes.popOverDiv}>
              <InvitationPopOver />

            </div>

          </Popover>

        </div>
        <div style={{ display: 'flex' }}>
          {user && (
            <Avatar
              {...user}
              width="50px"
            />

          )}

          <IconButton onClick={handleMenu}>
            <ArrowDropDownIcon fontSize="large" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            {user
              && (
                <MenuItem>
                  <Link
                    href={`/profile/${user.idUser}`}
                    color="inherit"
                    style={{ textDecoration: 'none' }}
                  >
                    My Profile
                  </Link>
                </MenuItem>
              )}

            <Divider />
            <MenuItem>
              <Link
                href="/change-password"
                color="inherit"
                style={{ textDecoration: 'none' }}
              >
                Change Password
              </Link>
            </MenuItem>

            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
