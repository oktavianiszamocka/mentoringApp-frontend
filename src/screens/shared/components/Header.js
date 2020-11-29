/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar } from '@material-ui/core';
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

const userConst = {
  firstName: 'Jan',
  lastName: 'Kowalsi',
  imageUrl:
    'data:image/jpeg;base64,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',
};

const imgTheme = {
  width: '60px',
  borderRadius: '50%',
};

const StyledImg = styled.img`
  width: 6rem;
  height: 5rem;
`;

const useStyles = makeStyles(() => ({
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
}));

// TODO update the URLS
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
    url: '',
  },
  {
    title: 'Notifications',
    url: '',
  },
];

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          <a href="http://localhost:3000/main-page">
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
        </div>
        <div style={{ display: 'flex' }}>
          {user && (
            <Avatar
              firstName={user.firstName}
              lastName={user.lastName}
              imageUrl={user.imageUrl}
              imgTheme={imgTheme}
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
                <Avatar
                  firstName={user.firstName}
                  lastName={user.lastName}
                  imageUrl={user.imageUrl}
                  imgTheme={imgTheme}
                  width="50px"
                />
                )}

            <Divider />
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
