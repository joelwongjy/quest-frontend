import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/EmojiPeopleRounded';
import ExitIcon from '@material-ui/icons/ExitToAppRounded';
import HomeIcon from '@material-ui/icons/HomeRounded';
import QuestionIcon from '@material-ui/icons/QuestionAnswerRounded';
import SchoolIcon from '@material-ui/icons/SchoolRounded';
import SettingIcon from '@material-ui/icons/SettingsRounded';
import StarIcon from '@material-ui/icons/StarsRounded';

import homeIcon from 'assets/images/student/house.png';
import swordIcon from 'assets/images/student/sword-white.png';
import QuestAlert from 'componentWrappers/questAlert';
import {
  ADMINS,
  CASTLE,
  HOME,
  PROGRAMMES,
  QUESTIONNAIRES,
  QUESTS,
  STUDENTS,
  TEACHERS,
} from 'constants/routes';
import { useAuth } from 'contexts/AuthContext';
import { useUser } from 'contexts/UserContext';
import { QuestComponentProps } from 'interfaces/components/common';

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
  const { isStaff } = useUser();
  const pathname = `/${useLocation().pathname.split('/')[1]}`;

  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertHeader, setAlertHeader] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleLogOut = () => {
    setAlertHeader('Log Out');
    setAlertMessage('You are attempting to log out, are you sure?');
    setIsAlertOpen(true);
  };

  const toolbarClasses = `${classes.toolbar}${
    isStaff ? `` : ` ${classes.studentToolbar}`
  }`;

  const drawerClasses = `${classes.drawerPaper}${
    isStaff ? '' : ` ${classes.studentDrawerPaper}`
  }`;

  const listItemClasses = `${classes.listItem}${
    isStaff ? '' : ` ${classes.studentListItem}`
  }`;

  const drawer = (
    <>
      <div className={toolbarClasses} />
      <List>
        {!isStaff && (
          <>
            <ListItem
              button
              key="Castle"
              selected={pathname === CASTLE}
              component={Link}
              to={CASTLE}
              className={listItemClasses}
            >
              <ListItemIcon>
                <img
                  src={homeIcon}
                  alt="Quests"
                  className={classes.studentIcon}
                />
              </ListItemIcon>
              <ListItemText primary="Castle" />
            </ListItem>
            <ListItem
              button
              key="Quests"
              selected={pathname === QUESTS}
              component={Link}
              to={QUESTS}
              className={listItemClasses}
            >
              <ListItemIcon>
                <img
                  src={swordIcon}
                  alt="Quests"
                  className={classes.studentIcon}
                />
              </ListItemIcon>
              <ListItemText primary="Quests" />
            </ListItem>
          </>
        )}
        {isStaff && (
          <>
            <ListItem
              button
              key="Home"
              selected={pathname === HOME}
              component={Link}
              to={HOME}
              className={listItemClasses}
            >
              <ListItemIcon>
                <HomeIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              key="Questionnaires"
              selected={pathname === QUESTIONNAIRES}
              component={Link}
              to={QUESTIONNAIRES}
              className={listItemClasses}
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
              className={listItemClasses}
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
              className={listItemClasses}
            >
              <ListItemIcon>
                <PersonIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Students" />
            </ListItem>
            <ListItem
              button
              key="Teachers"
              selected={pathname === TEACHERS}
              component={Link}
              to={TEACHERS}
              className={listItemClasses}
            >
              <ListItemIcon>
                <SchoolIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Teachers" />
            </ListItem>
            <ListItem
              button
              key="Admins"
              selected={pathname === ADMINS}
              component={Link}
              to={ADMINS}
              className={listItemClasses}
            >
              <ListItemIcon>
                <SettingIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Admins" />
            </ListItem>
          </>
        )}
        <ListItem
          button
          key="Logout"
          className={listItemClasses}
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
            paper: drawerClasses,
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
            paper: drawerClasses,
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
