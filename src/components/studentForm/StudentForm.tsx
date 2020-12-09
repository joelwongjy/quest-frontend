import React, { useReducer, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  List,
  ListItem,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';

import QuestCard from 'componentWrappers/questCard';
import QuestTextField from 'componentWrappers/questTextField';
import QuestButton from 'componentWrappers/questButton';
import { Activity, Student, StudentMode } from 'interfaces/models/students';
import { useError } from 'contexts/ErrorContext';

import { STUDENTS } from 'constants/routes';
import { useHistory } from 'react-router-dom';
import { DatePicker } from '@material-ui/pickers';
import { isValidEmail, isValidMobileNumber } from 'utils/studentUtils';
import { useStyles } from './StudentForm.styles';

interface StudentFormProps {
  mode: StudentMode;
  student?: Student;
  studentCallback?: (newStudent: Student) => void;
  alertCallback: (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler: undefined | (() => void),
    cancelHandler: undefined | (() => void)
  ) => void;
}

interface StudentFormState {
  name: string;
  gender: string;
  birthday: Date;
  mobileNumber?: string;
  homeNumber?: string;
  email?: string;
  activities: Activity[];
}

const StudentForm: React.FunctionComponent<StudentFormProps> = ({
  mode,
  student,
  alertCallback,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { hasError } = useError();

  const [activities, setActivities] = useState<string[]>([
    'Activity 1',
    'Activity 2',
  ]);

  const programmes = ['Programme 1', 'Programme 2'];

  const questClasses = ['Class 1', 'Class 2'];

  const [state, setState] = useReducer(
    (s: StudentFormState, a: Partial<StudentFormState>) => ({
      ...s,
      ...a,
    }),
    {
      name: student?.name ?? '',
      gender: student?.gender ?? 'Male',
      birthday: student?.birthday ?? new Date(),
      mobileNumber: student?.mobileNumber ?? '',
      homeNumber: student?.homeNumber ?? '',
      email: student?.email ?? '',
      activities: student?.activities ?? [],
    }
  );

  const handleCancel = () => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'You will not be able to retrieve the above information.',
      () => {
        history.push(STUDENTS);
      },
      undefined
    );
  };

  const renderButtons = () => {
    switch (mode) {
      case StudentMode.NEW:
        return (
          <Grid container spacing={2} justify="flex-end">
            <QuestButton
              className={classes.button}
              variant="outlined"
              onClick={handleCancel}
            >
              Cancel
            </QuestButton>
            <QuestButton className={classes.button}>Add Student</QuestButton>
          </Grid>
        );
      case StudentMode.EDIT:
        return (
          <Grid container spacing={2} justify="flex-end">
            <QuestButton
              className={classes.button}
              variant="outlined"
              onClick={handleCancel}
            >
              Discard Changes
            </QuestButton>
            <QuestButton className={classes.button}>Save Changes</QuestButton>
          </Grid>
        );
      default:
        return <></>;
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ marginTop: '2rem', marginBottom: '4rem' }}
    >
      <Grid item xs={9}>
        <QuestCard>
          <Grid item container xs={12} className={classes.header}>
            {mode === StudentMode.NEW && (
              <Typography
                component="h1"
                variant="h5"
                style={{ color: 'white' }}
              >
                Add Student Info
              </Typography>
            )}
            {mode === StudentMode.EDIT && (
              <Typography
                component="h1"
                variant="h5"
                style={{ color: 'white' }}
              >
                Edit Student Info
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <List className={classes.list}>
              <ListItem>
                <Typography variant="h6" className={classes.subheader}>
                  Particulars:
                </Typography>
              </ListItem>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Name: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <div className={classes.textfieldContainer}>
                      <FormControl
                        style={{ width: '100%' }}
                        error={hasError && state.name === ''}
                      >
                        <QuestTextField
                          required
                          size="small"
                          className={classes.textfield}
                          label="Name"
                          variant="outlined"
                          onChange={(e) => setState({ name: e.target.value })}
                        />
                        {hasError && state.name === '' && (
                          <FormHelperText>
                            The name cannot be blank!
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Gender: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl
                      variant="outlined"
                      size="small"
                      className={classes.textfieldContainer}
                      color="secondary"
                    >
                      <Select
                        id="gender-select"
                        value={state.gender}
                        onChange={(
                          event: React.ChangeEvent<{ value: unknown }>
                        ) => {
                          setState({ gender: event.target.value as string });
                        }}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Famale">Female</MenuItem>
                      </Select>
                      {hasError && state.gender === '' && (
                        <FormHelperText>
                          The gender cannot be blank!
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Birthday: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <DatePicker
                      disableFuture
                      allowKeyboardControl={false}
                      renderInput={(props) => (
                        <TextField
                          variant="outlined"
                          style={{ display: 'flex' }}
                          size="small"
                          color="secondary"
                          {...props}
                        />
                      )}
                      value={state.birthday}
                      onChange={(newDate: Date | null) => {
                        setState({ birthday: newDate ?? new Date() });
                      }}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Mobile Number: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <div className={classes.textfieldContainer}>
                      <FormControl
                        style={{ width: '100%' }}
                        error={
                          hasError &&
                          state.mobileNumber !== undefined &&
                          !isValidMobileNumber(state.mobileNumber)
                        }
                      >
                        <QuestTextField
                          size="small"
                          className={classes.textfield}
                          label="Mobile Number"
                          variant="outlined"
                          onChange={(e) =>
                            setState({ mobileNumber: e.target.value })
                          }
                        />
                        {hasError &&
                          state.mobileNumber &&
                          !isValidMobileNumber(state.mobileNumber!) && (
                            <FormHelperText>
                              The name cannot be blank!
                            </FormHelperText>
                          )}
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Home Number: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <div className={classes.textfieldContainer}>
                      <FormControl
                        style={{ width: '100%' }}
                        error={
                          hasError && !isValidMobileNumber(state.homeNumber!)
                        }
                      >
                        <QuestTextField
                          size="small"
                          className={classes.textfield}
                          label="Home Number"
                          variant="outlined"
                          onChange={(e) =>
                            setState({ homeNumber: e.target.value })
                          }
                        />
                        {hasError &&
                          state.homeNumber &&
                          !isValidMobileNumber(state.homeNumber!) && (
                            <FormHelperText>
                              Please enter a valid home number!
                            </FormHelperText>
                          )}
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Email: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <div className={classes.textfieldContainer}>
                      <FormControl
                        style={{ width: '100%' }}
                        error={hasError && !isValidEmail(state.email!)}
                      >
                        <QuestTextField
                          size="small"
                          className={classes.textfield}
                          label="Email"
                          variant="outlined"
                          onChange={(e) => setState({ email: e.target.value })}
                        />
                        {hasError &&
                          state.email &&
                          !isValidEmail(state.email) && (
                            <FormHelperText>
                              Please enter a valid email address!
                            </FormHelperText>
                          )}
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Typography
                  variant="h6"
                  className={classes.subheader}
                  style={{ marginTop: '0.5rem' }}
                >
                  Activities:
                </Typography>
              </ListItem>
              {activities.map((a, index) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Grid container key={`${a}-${index}`}>
                    <ListItem>
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={4}>
                          <Typography variant="subtitle1">
                            Programme:
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <FormControl
                            variant="outlined"
                            size="small"
                            className={classes.textfieldContainer}
                            color="secondary"
                          >
                            <Select
                              id="select-programmes"
                              value={programmes[0]}
                            >
                              {programmes.map((p) => {
                                return (
                                  <MenuItem value={p} key={p}>
                                    {p}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem style={{ marginBottom: '0.5rem' }}>
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={4}>
                          <Typography variant="subtitle1">Class:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <FormControl
                            variant="outlined"
                            size="small"
                            className={classes.textfieldContainer}
                            color="secondary"
                          >
                            <Select
                              id="select-programmes"
                              value={questClasses[0]}
                            >
                              {questClasses.map((c) => {
                                return (
                                  <MenuItem value={c} key={c}>
                                    {c}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </Grid>
                );
              })}
              <ListItem>
                <QuestCard
                  onClick={() => {
                    const newActivities = activities.slice();
                    newActivities.push('Activity x');
                    setActivities(newActivities);
                  }}
                  className={classes.addCard}
                >
                  <AddCircleIcon className={classes.addIcon} />
                  Add an activity
                </QuestCard>
              </ListItem>
              <ListItem>{renderButtons()}</ListItem>
            </List>
          </Grid>
        </QuestCard>
      </Grid>
    </Grid>
  );
};

export default StudentForm;
