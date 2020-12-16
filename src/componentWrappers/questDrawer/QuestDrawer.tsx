import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/HomeRounded';
import QuestionIcon from '@material-ui/icons/QuestionAnswerRounded';
import PersonIcon from '@material-ui/icons/EmojiPeopleRounded';
import StarIcon from '@material-ui/icons/StarsRounded';
import ExitIcon from '@material-ui/icons/ExitToAppRounded';

import { QuestComponentProps } from 'interfaces/components/common';
import { HOME, PROGRAMMES, QUESTIONNAIRES, STUDENTS } from 'constants/routes';
import { useAuth } from 'contexts/AuthContext';
import QuestAlert from 'componentWrappers/questAlert';
import { useUser } from 'contexts/UserContext';

import { ClassUserRole } from 'interfaces/models/classUsers';
import { useStyles } from './questDrawer.styles';

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
  const { logout } = useAuth();
  const user = useUser();
  const pathname = `/${useLocation().pathname.split('/')[1]}`;

  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertHeader, setAlertHeader] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleLogOut = () => {
    setAlertHeader('Log Out');
    setAlertMessage('You are attempting to log out, are you sure?');
    setIsAlertOpen(true);
  };

  const isStaff =
    user &&
    (user.role === ClassUserRole.ADMIN || user.role === ClassUserRole.TEACHER);

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <List>
        <ListItem
          button
          key="Home"
          selected={pathname === HOME}
          component={Link}
          to={HOME}
          className={classes.listItem}
        >
          <ListItemIcon>
            <HomeIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {isStaff && (
          <>
            <ListItem
              button
              key="Questionnaires"
              selected={pathname === QUESTIONNAIRES}
              component={Link}
              to={QUESTIONNAIRES}
              className={classes.listItem}
            >
              <ListItemIcon>
                <QuestionIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Questionnaires" />
            </ListItem>
            <ListItem
              button
              key="Programmes"
              selected={pathname === PROGRAMMES}
              component={Link}
              to={PROGRAMMES}
              className={classes.listItem}
            >
              <ListItemIcon>
                <StarIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Programmes" />
            </ListItem>

            <ListItem
              button
              key="Students"
              selected={pathname === STUDENTS}
              component={Link}
              to={STUDENTS}
              className={classes.listItem}
            >
              <ListItemIcon>
                <PersonIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Students" />
            </ListItem>
          </>
        )}
        <ListItem
          button
          key="Logout"
          className={classes.listItem}
          onClick={handleLogOut}
        >
          <ListItemIcon>
            <ExitIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden mdUp implementation="css">
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
      <Hidden smDown implementation="css">
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
      <QuestAlert
        isAlertOpen={isAlertOpen}
        hasConfirm
        alertHeader={alertHeader}
        alertMessage={alertMessage}
        closeHandler={() => setIsAlertOpen(false)}
        confirmHandler={() => {
          setIsAlertOpen(false);
          logout();
        }}
        cancelHandler={() => setIsAlertOpen(false)}
      />
    </nav>
  );
};

export default QuestDrawer;
