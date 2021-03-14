import React, { useReducer, useState } from 'react';
import {
  Checkbox,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

import QuestCard from 'componentWrappers/questCard';
import QuestButton from 'componentWrappers/questButton';
import { PersonListData } from 'interfaces/models/persons';
import { ClassData } from 'interfaces/models/classes';
import ApiService from 'services/apiService';
import { sortByName } from 'utils/sortingUtils';

import { useStyles } from './ClassStudentForm.styles';

interface ClassStudentFormProps {
  questClass: ClassData;
  students: PersonListData[];
  studentCallback?: (newStudent: PersonListData) => void;
  cancelCallback: () => void;
  alertCallback: (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler: undefined | (() => void),
    cancelHandler: undefined | (() => void)
  ) => void;
}

export interface StudentFormState {
  students: PersonListData[];
  checked: number[];
}

const ClassStudentForm: React.FunctionComponent<ClassStudentFormProps> = ({
  questClass,
  students,
  cancelCallback,
  alertCallback,
}) => {
  const classes = useStyles();
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const availableStudents = students.filter(
    (s) => !questClass.students.includes(s)
  );

  const [state, setState] = useReducer(
    (s: StudentFormState, a: Partial<StudentFormState>) => ({
      ...s,
      ...a,
    }),
    {
      students: [],
      checked: [],
    }
  );

  const handleCancel = () => {
    if (isSuccessful || state.students.length === 0) {
      cancelCallback();
    } else {
      alertCallback(
        true,
        true,
        'Are you sure?',
        'The information will not be saved.',
        cancelCallback,
        undefined
      );
    }
  };

  const handleToggleStudent = (
    student: PersonListData,
    index: number
  ): void => {
    const currentIndex = state.checked.indexOf(index);
    const newChecked = [...state.checked];

    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    const studentIndex = state.students.indexOf(student);
    const newStudents = [...state.students];

    if (studentIndex === -1) {
      newStudents.push(student);
    } else {
      newStudents.splice(studentIndex, 1);
    }
    setState({ students: newStudents, checked: newChecked });
  };

  const handleDeleteStudent = (index: number) => {
    const newChecked = state.checked.slice();
    newChecked.splice(index, 1);
    const newStudents = state.students.slice();
    newStudents.splice(index, 1);
    setState({ students: newStudents, checked: newChecked });
  };

  const handleEdit = async () => {
    // TODO: Add loading
    try {
      const response = await ApiService.patch(`classes/${questClass.id}`, {
        ...questClass,
        students: [...questClass.students, state.students],
      });
      if (response.status === 200) {
        setIsSuccessful(true);
        window.scrollTo({
          top: 0,
          behavior: 'auto',
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      // TODO: Add error handling here
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ marginTop: '2rem', paddingBottom: '4rem' }}
    >
      <Grid item xs={12} md={9}>
        <QuestCard>
          <Grid
            item
            container
            xs={12}
            className={isSuccessful ? classes.headerSuccess : classes.header}
          >
            <Grid container alignItems="center" justify="space-between">
              <Typography
                component="h1"
                variant="h5"
                style={{ color: 'white' }}
              >
                Add Students {isSuccessful && ' - Successful'}
              </Typography>
              <IconButton onClick={handleCancel}>
                <CloseIcon style={{ color: 'white', fontSize: 36 }} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" style={{ marginTop: '1.5rem' }}>
              <Grid item>
                <Typography variant="subtitle1">
                  {state.students.length}{' '}
                  {state.students.length === 1 ? 'Student' : 'Students'}{' '}
                  Selected
                </Typography>
              </Grid>
            </Grid>

            <List className={classes.list}>
              <Grid item container justify="space-between" spacing={2}>
                <Grid item xs>
                  <List>
                    {availableStudents
                      .slice()
                      .sort(sortByName)
                      .map((s, index) => {
                        const labelId = `checkbox-list-label-${index}`;
                        return (
                          <ListItem
                            key={`${s}`}
                            dense
                            button
                            onClick={() => handleToggleStudent(s, index)}
                          >
                            <ListItemAvatar>
                              <Avatar>
                                <EmojiPeopleIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={s.name} />
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={state.checked.indexOf(index) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                          </ListItem>
                        );
                      })}
                  </List>
                </Grid>
                <Grid item xs>
                  <List>
                    {state.students
                      .slice()
                      .sort(sortByName)
                      .map((s, index) => {
                        return (
                          <ListItem dense key={`${s}`}>
                            <ListItemAvatar>
                              <Avatar>
                                <EmojiPeopleIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={s.name} />
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                style={{ color: 'red', marginBottom: '0.5rem' }}
                                onClick={() => handleDeleteStudent(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}
                  </List>
                </Grid>
              </Grid>
              {!isSuccessful && (
                <ListItem>
                  <p style={{ textAlign: 'center', width: '100%', margin: 0 }}>
                    If a student is not showing up, you need to add the student
                    first!
                  </p>
                </ListItem>
              )}
              {isSuccessful ? (
                <Grid container spacing={2} justify="flex-end">
                  <QuestButton
                    className={classes.button}
                    variant="outlined"
                    onClick={handleCancel}
                  >
                    Close
                  </QuestButton>
                </Grid>
              ) : (
                <Grid container spacing={2} justify="flex-end">
                  <QuestButton
                    className={classes.button}
                    variant="outlined"
                    onClick={handleCancel}
                  >
                    Cancel
                  </QuestButton>
                  <QuestButton className={classes.button} onClick={handleEdit}>
                    Add Students
                  </QuestButton>
                </Grid>
              )}
            </List>
          </Grid>
        </QuestCard>
      </Grid>
    </Grid>
  );
};

export default ClassStudentForm;
