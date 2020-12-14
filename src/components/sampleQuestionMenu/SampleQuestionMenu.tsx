import React, { useState } from 'react';

import {
  Drawer,
  Fab,
  Grid,
  List,
  ListItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import BookIcon from '@material-ui/icons/Bookmark';

import QuestCard from 'componentWrappers/questCard';
import { useStyles } from './sampleQuestionMenu.styles';

interface SampleQuestionMenuProps {
  isMenu: boolean;
  isFab: boolean;
}

const SampleQuestionMenu: React.FunctionComponent<SampleQuestionMenuProps> = ({
  isMenu,
  isFab,
}) => {
  const classes = useStyles();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  if (isMenu) {
    return (
      <Drawer
        variant="permanent"
        open={isMenu}
        anchor="right"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ marginTop: '2rem' }}
        >
          <Typography variant="h6">Sample Questions</Typography>
        </Grid>
        <div className={classes.drawerContainer}>
          <List>
            {[
              'How much do you know about the topic?',
              'On a scale of 1-5, how much would you rate your experience of this programme?',
              'Reflect on the most interesting or memorable part of the programme in the space provided below.',
            ].map((text) => (
              <ListItem key={text}>
                <QuestCard className={classes.card}>{text}</QuestCard>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    );
  }

  if (isFab) {
    return (
      <div>
        <Drawer
          open={isMenuOpen}
          anchor="right"
          onClose={() => setIsMenuOpen(false)}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ marginTop: '2rem' }}
          >
            <Typography variant="h6">Sample Questions</Typography>
          </Grid>
          <div className={classes.drawerContainer}>
            <List>
              {[
                'How much do you know about the topic?',
                'On a scale of 1-5, how much would you rate your experience of this programme?',
                'Reflect on the most interesting or memorable part of the programme in the space provided below.',
              ].map((text) => (
                <ListItem key={text}>
                  <QuestCard className={classes.card}>{text}</QuestCard>
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <Fab
          color="secondary"
          aria-label="edit"
          className={classes.fab}
          onClick={() => setIsMenuOpen(true)}
        >
          <BookIcon />
        </Fab>
      </div>
    );
  }

  return <></>;
};

export default SampleQuestionMenu;
