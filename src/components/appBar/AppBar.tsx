import React, { useRef } from 'react';
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
import { QuestComponentProps } from 'interfaces/components/common';

import { useStyles } from './appBar.styles';

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
  const profileMenuRef = useRef<HTMLButtonElement | null>(null);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar
      elevation={trigger ? 4 : 0}
      className={classes.appBar}
      position="fixed"
    >
      <Toolbar>
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
        <div>
          <IconButton
            edge="end"
            ref={profileMenuRef}
            aria-label="User Profile Picture"
            aria-controls={menuId}
            aria-haspopup="true"
          >
            <AccountsIcon htmlColor={theme!.custom.icon.iconColor} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default QuestAppBar;
