import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { QuestComponentProps } from 'components';
import { HOME, PROGRAMMES, QUESTIONNAIRES, STUDENTS } from 'constants/routes';

import { useStyles } from './drawer.styles';

interface QuestDrawerProps extends QuestComponentProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

const QuestDrawer: React.FunctionComponent<QuestDrawerProps> = ({
  theme,
  isDrawerOpen = false,
  toggleDrawer,
}) => {
  const classes = useStyles();
  const pathname = `/${useLocation().pathname.split('/')[1]}`;

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          button
          key="Home"
          selected={pathname === HOME}
          component={Link}
          to={HOME}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          key="Questionnaires"
          selected={pathname === QUESTIONNAIRES}
          component={Link}
          to={QUESTIONNAIRES}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Questionnaires" />
        </ListItem>
        <ListItem
          button
          key="Programmes"
          selected={pathname === PROGRAMMES}
          component={Link}
          to={PROGRAMMES}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Programmes" />
        </ListItem>
        <ListItem
          button
          key="Students"
          selected={pathname === STUDENTS}
          component={Link}
          to={STUDENTS}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItem>
      </List>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme!.direction === 'rtl' ? 'right' : 'left'}
          open={isDrawerOpen}
          onClose={toggleDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default QuestDrawer;
