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
  IconButton,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import { DatePicker } from '@material-ui/pickers';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

import QuestCard from 'componentWrappers/questCard';
import QuestTextField from 'componentWrappers/questTextField';
import QuestButton from 'componentWrappers/questButton';
import { Student, StudentMode } from 'interfaces/models/students';
import { useError } from 'contexts/ErrorContext';
import {
  isValidEmail,
  isValidMobileNumber,
  validateStudentInfo,
} from 'utils/studentUtils';
import { useUser } from 'contexts/UserContext';
import { StudentPostData } from 'interfaces/api/students';

import { useStyles } from './StudentForm.styles';

interface StudentFormProps {
  mode: StudentMode;
  student?: Student;
  studentCallback?: (newStudent: Student) => void;
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

export interface StudentFormState extends Omit<StudentPostData, 'birthday'> {
  birthday: Date | null;
}

const StudentForm: React.FunctionComponent<StudentFormProps> = ({
  mode,
  student,
  cancelCallback,
  alertCallback,
}) => {
  const classes = useStyles();
  const { hasError, setHasError } = useError();
  const user = useUser();

  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const availableProgrammes =
    user!.programmes.filter((p) =>
      user!.classes.some((c) => c.programmeId === p.id)
    ) ?? [];

  const availableClasses = user!.classes.filter((c) =>
    availableProgrammes.some((p) => p.id === c.programmeId)
  );

  const [state, setState] = useReducer(
    (s: StudentFormState, a: Partial<StudentFormState>) => ({
      ...s,
      ...a,
    }),
    {
      name: student?.name ?? '',
      gender: student?.gender ?? 'M',
      birthday: student?.birthday ?? new Date(),
      mobileNumber: student?.mobileNumber ?? '',
      homeNumber: student?.homeNumber ?? '',
      email: student?.email ?? '',
      // TODO: change to student?.activities ?? [] when ready
      activities: [],
    }
  );

  const handleCancel = () => {
    if (isSuccessful) {
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

  const handleProgrammeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    const [id, index] = (event.target.value as string).split('-').map(Number);
    const newActivities = state.activities.slice();
    [newActivities[index][0]] = user!.programmes.filter((p) => p.id === id);
    newActivities[index][1] =
      availableClasses.filter((c) => c.programmeId === id)[0] ?? undefined;
    setState({ activities: newActivities });
  };

  const handleClassChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    const [id, index] = (event.target.value as string).split('-').map(Number);
    const newActivities = state.activities.slice();
    [newActivities[index][1]] = availableClasses.filter((c) => c.id === id);
    setState({ activities: newActivities });
  };

  const handleAdd = () => {
    if (!validateStudentInfo(state)) {
      setHasError(true);
      return;
    }
    setHasError(false);
    setIsSuccessful(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // TODO: Post the data over
  };

  const handleEdit = () => {
    if (!validateStudentInfo(state)) {
      setHasError(true);
      return;
    }
    setHasError(false);
    setIsSuccessful(true);
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
    // TODO: Post the data over
  };

  const handleDeleteActivity = (index: number) => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'You will not be able to retrieve the deleted activity.',
      () => {
        const newActivities = state.activities.slice();
        newActivities.splice(index, 1);
        setState({ activities: newActivities });
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
            <QuestButton className={classes.button} onClick={handleAdd}>
              Add Student
            </QuestButton>
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
            <QuestButton className={classes.button} onClick={handleEdit}>
              Save Changes
            </QuestButton>
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
      <Grid item xs={12} md={9}>
        <QuestCard>
          <Grid
            item
            container
            xs={12}
            className={isSuccessful ? classes.headerSuccess : classes.header}
          >
            <Grid container alignItems="center" justify="space-between">
              {mode === StudentMode.NEW && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  Add Student Info {isSuccessful && ' - Successful'}
                </Typography>
              )}
              {mode === StudentMode.EDIT && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  Edit Student Info {isSuccessful && ' - Successful'}
                </Typography>
              )}
              <IconButton onClick={handleCancel}>
                <CloseIcon style={{ color: 'white', fontSize: 36 }} />
              </IconButton>
            </Grid>
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
                          value={state.name}
                          className={classes.textfield}
                          label="Name"
                          variant="outlined"
                          disabled={isSuccessful}
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
                      error={hasError && state.gender === ''}
                    >
                      <Select
                        id="gender-select"
                        value={state.gender}
                        disabled={isSuccessful}
                        onChange={(
                          event: React.ChangeEvent<{ value: unknown }>
                        ) => {
                          setState({ gender: event.target.value as string });
                        }}
                      >
                        <MenuItem value="M">Male</MenuItem>
                        <MenuItem value="F">Female</MenuItem>
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
                    <FormControl
                      style={{ width: '100%' }}
                      error={hasError && state.birthday === null}
                    >
                      <DatePicker
                        disableFuture
                        allowKeyboardControl={false}
                        disabled={isSuccessful}
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
                          setState({ birthday: newDate });
                        }}
                      />
                      {hasError && state.birthday === null && (
                        <FormHelperText>
                          The birthday cannot be blank!
                        </FormHelperText>
                      )}
                    </FormControl>
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
                          disabled={isSuccessful}
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
                          disabled={isSuccessful}
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
                          disabled={isSuccessful}
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
              {state.activities.map((a, index) => {
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
                              value={`${a[0].id}-${index}`}
                              onChange={handleProgrammeChange}
                              disabled={isSuccessful}
                            >
                              {availableProgrammes.map((p) => {
                                return (
                                  <MenuItem
                                    value={`${p.id}-${index}`}
                                    key={`programme-${p.id}`}
                                  >
                                    {p.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
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
                              value={`${a[1].id}-${index}`}
                              onChange={handleClassChange}
                              disabled={isSuccessful}
                            >
                              {availableClasses
                                .filter((c) => c.programmeId === a[0].id)
                                .map((c) => {
                                  return (
                                    <MenuItem
                                      value={`${c.id}-${index}`}
                                      key={`class-${c.id}`}
                                    >
                                      {c.name}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </ListItem>
                    {!isSuccessful && (
                      <Grid container alignItems="center">
                        <Grid item xs={4}>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            style={{ color: 'red', marginBottom: '0.5rem' }}
                            onClick={() => handleDeleteActivity(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={8}
                          style={{
                            paddingLeft: '0.5rem',
                            marginBottom: '0.75rem',
                          }}
                        >
                          {hasError &&
                            state.activities.filter(
                              (x) => x[0].id === a[0].id && x[1].id === a[0].id
                            ).length > 1 && (
                              <FormHelperText style={{ color: 'red' }}>
                                This activity is duplicated!
                              </FormHelperText>
                            )}
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                );
              })}
              {!isSuccessful && (
                <FormControl
                  style={{
                    width: '100%',
                  }}
                  error={hasError && state.activities.length === 0}
                >
                  {hasError && state.activities.length === 0 && (
                    <FormHelperText style={{ textAlign: 'center' }}>
                      You need to add at least one activity!
                    </FormHelperText>
                  )}
                </FormControl>
              )}
              {!isSuccessful && (
                <ListItem>
                  <QuestCard
                    onClick={() => {
                      if (user?.programmes.length === 0) {
                        alertCallback(
                          true,
                          false,
                          'You cannot add activities!',
                          'You need to be part of a programme to add students to it.',
                          undefined,
                          undefined
                        );
                        return;
                      }
                      if (availableProgrammes.length === 0) {
                        alertCallback(
                          true,
                          false,
                          'You cannot add activities!',
                          'You need to create classes first for the student to join.',
                          undefined,
                          undefined
                        );
                        return;
                      }
                      const newActivities = state.activities.slice();
                      newActivities.push([
                        availableProgrammes[0],
                        user!.classes.filter(
                          (c) => c.programmeId === availableProgrammes[0].id
                        )[0],
                      ]);
                      setState({ activities: newActivities });
                    }}
                    className={classes.addCard}
                  >
                    <AddCircleIcon className={classes.addIcon} />
                    Add an activity
                  </QuestCard>
                </ListItem>
              )}
              {!isSuccessful && (
                <ListItem>
                  <p style={{ textAlign: 'center', width: '100%', margin: 0 }}>
                    If your programme is not showing up, that means you need to
                    create classes for it first!
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
                <ListItem>{renderButtons()}</ListItem>
              )}
            </List>
          </Grid>
        </QuestCard>
      </Grid>
    </Grid>
  );
};

export default StudentForm;
