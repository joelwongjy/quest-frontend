import React, { useState } from 'react';

import {
  Button,
  CardActionArea,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  Drawer,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import BookIcon from '@material-ui/icons/Bookmark';

import QuestCard from 'componentWrappers/questCard';
import { useWindowSize } from 'utils/windowUtils';
import { QuestionnaireType } from 'interfaces/models/questionnaires';
import { useDispatch } from 'react-redux';
import {
  addSampleQuestionToPost,
  addSampleQuestionToPre,
  addSampleQuestionToShared,
} from 'reducers/questionnaireDux';
import { useStyles } from './sampleQuestionMenu.styles';

interface SampleQuestionMenuProps {
  type: QuestionnaireType;
}

const SampleQuestionMenu: React.FunctionComponent<SampleQuestionMenuProps> = ({
  type,
}) => {
  const classes = useStyles();
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const [checked, setChecked] = React.useState([0]);

  const accessibilityOptions = ['Shared', 'Pre-Programme', 'Post-Programme'];

  const handleAddSampleQuestion = (text: string) => {
    if (type === QuestionnaireType.ONE_TIME) {
      dispatch(addSampleQuestionToPre(text));
    } else {
      if (checked.indexOf(0) !== -1) {
        dispatch(addSampleQuestionToShared(text));
      }
      if (checked.indexOf(1) !== -1) {
        dispatch(addSampleQuestionToPre(text));
      }
      if (checked.indexOf(2) !== -1) {
        dispatch(addSampleQuestionToPost(text));
      }
    }
  };

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const sampleQuestions: string[] = [
    'How much do you know about the topic?',
    'On a scale of 1-5, how much would you rate your experience of this programme?',
    'Reflect on the most interesting or memorable part of the programme in the space provided below.',
  ];

  if (width! >= 720) {
    return (
      <div>
        <Drawer
          variant="permanent"
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
              {sampleQuestions.map((text) => (
                <ListItem key={text}>
                  <CardActionArea
                    className={classes.cardActionArea}
                    onClick={() => {
                      setText(text);
                      if (type === QuestionnaireType.ONE_TIME) {
                        handleAddSampleQuestion(text);
                      } else {
                        setIsDialogOpen(true);
                      }
                    }}
                  >
                    <QuestCard className={classes.card}>{text}</QuestCard>
                  </CardActionArea>
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <Dialog
          onClose={() => setIsDialogOpen(false)}
          aria-labelledby="accessibility-dialog"
          open={isDialogOpen}
        >
          <DialogTitle id="accessibility-dialog">Add question to:</DialogTitle>
          <List>
            {accessibilityOptions.map((option, index) => {
              const labelId = `checkbox-list-secondary-label-${index}`;
              return (
                <ListItem button key={option}>
                  <ListItemText>{option}</ListItemText>
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(index)}
                      checked={checked.indexOf(index) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleAddSampleQuestion(text);
                setIsDialogOpen(false);
              }}
              color="secondary"
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

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
            {sampleQuestions.map((text) => (
              <ListItem key={text}>
                <CardActionArea
                  className={classes.cardActionArea}
                  onClick={() => {
                    setText(text);
                    if (type === QuestionnaireType.ONE_TIME) {
                      handleAddSampleQuestion(text);
                    } else {
                      setIsDialogOpen(true);
                    }
                  }}
                >
                  <QuestCard className={classes.card}>{text}</QuestCard>
                </CardActionArea>
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
      <Dialog
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="accessibility-dialog"
        open={isDialogOpen}
      >
        <DialogTitle id="accessibility-dialog">Add question to:</DialogTitle>
        <List>
          {accessibilityOptions.map((option, index) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            return (
              <ListItem key={option}>
                <ListItemText>{option}</ListItemText>
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(index)}
                    checked={checked.indexOf(index) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleAddSampleQuestion(text);
              setIsDialogOpen(false);
            }}
            color="secondary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SampleQuestionMenu;
