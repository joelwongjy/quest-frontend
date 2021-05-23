import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import logo from 'assets/images/logo.png';
import profile from 'assets/images/profile.png';
import { PROFILE } from 'constants/routes';
import { useUser } from 'contexts/UserContext';
import { QuestComponentProps } from 'interfaces/components/common';

import { useStyles } from './questAppBar.styles';

const LogoContainer: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.logoContainer}>
      <img className={classes.logo} src={logo} alt="logo" />
    </div>
  );
};

const ChildrenContainer: React.FunctionComponent<QuestComponentProps> = ({
  className = '',
  children,
}) => {
  return <div className={className}>{children}</div>;
};

interface QuestAppBarProps extends QuestComponentProps {
  hasDrawer: boolean;
  toggleDrawer: () => void;
}

const QuestAppBar: React.FunctionComponent<QuestAppBarProps> = ({
  hasDrawer,
  theme,
  toggleDrawer,
  children,
}) => {
  const menuId = 'primary-search-account-menu';
  const classes = useStyles();
  const history = useHistory();
  const { user, isStaff } = useUser();
  const profileMenuRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AppBar
      elevation={0}
      className={`${classes.appBar} ${hasDrawer ? classes.appBarShorten : ''} ${
        isStaff ? '' : 'is-student'
      }`}
      position="fixed"
    >
      <Toolbar className={`${isStaff ? '' : classes.studentToolbar}`}>
        {hasDrawer && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="Open Drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon htmlColor={theme!.custom.icon.iconColor} />
          </IconButton>
        )}
        <LogoContainer />
        <ChildrenContainer className={classes.childrenContainer}>
          {children}
        </ChildrenContainer>
        <div className={classes.grow} />
        {user && (
          <div>
            <Button
              ref={profileMenuRef}
              aria-label="User Profile Picture"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => {
                history.push(PROFILE);
              }}
            >
              <img src={profile} alt="Profile" className={classes.profile} />
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default QuestAppBar;
