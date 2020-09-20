import React, { useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useScrollTrigger,
} from '@material-ui/core';
import {
  AccountCircleOutlined as AccountsIcon,
  Menu as MenuIcon,
} from '@material-ui/icons';
import logo from 'assets/logo.png';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  containerBorder: {
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderBottomColor: theme.palette.divider,
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(1),
    },
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'stretch',
  },
  logo: {
    display: 'none',
    height: theme.spacing(8),
    padding: theme.spacing(0, 1, 0, 0),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  title: {
    ...theme.custom.fontFamily.metropolis,
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  searchbarContainer: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      flexGrow: 0,
      width: theme.spacing(90),
      marginLeft: theme.spacing(9),
    },
  },
}));

function LogoContainer() {
  const classes = useStyles();
  return (
    <div className={classes.logoContainer}>
      <img className={classes.logo} src={logo} alt="logo" />
      <Typography
        color="textSecondary"
        className={classes.title}
        variant="h6"
        noWrap
      >
        Quest
      </Typography>
    </div>
  );
}

function SearchContainer() {
  const classes = useStyles();
  return (
    <div className={classes.searchbarContainer}>
      <SearchBar ml={8} />
    </div>
  );
}

export default function () {
  const menuId = 'primary-search-account-menu';
  const classes = useStyles();
  const theme = useTheme();
  const profileMenuRef = useRef();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <div className={classes.grow}>
      <AppBar
        elevation={trigger ? 4 : 0}
        className={trigger ? null : classes.containerBorder}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
          >
            <MenuIcon htmlColor={theme.custom.palette.iconColor} />
          </IconButton>
          <LogoContainer />
          <SearchContainer />
          <div className={classes.grow} />
          <div>
            <IconButton
              edge="end"
              ref={profileMenuRef}
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
            >
              <AccountsIcon htmlColor={theme.custom.palette.iconColor} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
