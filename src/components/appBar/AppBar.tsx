import React, { useRef } from 'react';
import { useTheme } from '@material-ui/core/styles';
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

import logo from 'assets/images/logo.png';
import { useStyles } from './appBar.styles';
import SearchBar from './searchBar/SearchBar';

const LogoContainer: React.FunctionComponent = () => {
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
};

const SearchContainer: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.searchbarContainer}>
      <SearchBar />
    </div>
  );
};

const CustomAppBar: React.FunctionComponent = () => {
  const menuId = 'primary-search-account-menu';
  const classes = useStyles();
  const theme = useTheme();
  const profileMenuRef = useRef<HTMLButtonElement | null>(null);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <div className={classes.grow}>
      <AppBar
        elevation={trigger ? 4 : 0}
        className={trigger ? '' : classes.containerBorder}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="Open Drawer"
          >
            <MenuIcon htmlColor={theme.custom.icon.iconColor} />
          </IconButton>
          <LogoContainer />
          <SearchContainer />
          <div className={classes.grow} />
          <div>
            <IconButton
              edge="end"
              ref={profileMenuRef}
              aria-label="User Profile Picture"
              aria-controls={menuId}
              aria-haspopup="true"
            >
              <AccountsIcon htmlColor={theme.custom.icon.iconColor} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CustomAppBar;
