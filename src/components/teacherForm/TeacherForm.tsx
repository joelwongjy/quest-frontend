import React, { useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { DatePicker } from '@material-ui/pickers';

import QuestButton from 'componentWrappers/questButton';
import QuestCard from 'componentWrappers/questCard';
import QuestTextField from 'componentWrappers/questTextField';
import { TEACHERS } from 'constants/routes';
import { useError } from 'contexts/ErrorContext';
import { ClassPersonRole } from 'interfaces/models/classUsers';
import { Gender, PersonData, PersonPostData } from 'interfaces/models/persons';
import { TeacherMode } from 'interfaces/models/users';
import { MiscDux } from 'reducers/miscDux';
import { RootState } from 'reducers/rootReducer';
import ApiService from 'services/apiService';
import { isValidEmail, isValidMobileNumber } from 'utils/personUtils';
import { sortByName } from 'utils/sortingUtils';
import { validateTeacherInfo } from 'utils/teacherUtils';

import { useStyles } from './teacherForm.styles';

interface TeacherFormProps {
  mode: TeacherMode;
  teacher?: PersonData;
  teacherCallback?: (newTeacher: PersonData) => void;
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

export interface TeacherFormState extends Omit<PersonPostData, 'birthday'> {
  birthday: Date | null;
}

const TeacherForm: React.FunctionComponent<TeacherFormProps> = ({
  mode,
  teacher,
  cancelCallback,
  alertCallback,
}) => {
  const classes = useStyles();
  const { hasError, setHasError } = useError();
  const selectMisc = (state: RootState): MiscDux => state.misc;
  const { user } = useSelector(selectMisc);

  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const availableProgrammes =
    user?.programmes.filter(
      (p) =>
        p.classes.filter((c) => c.role !== ClassPersonRole.STUDENT).length > 0
    ) ?? [];

  const availableClasses =
    user?.programmes
      .map((p) => p.classes)
      .reduce((a, b) => [...a, ...b], [])
      .filter((c) => c.role !== ClassPersonRole.STUDENT) ?? [];

  const spreadProgrammes = (
    programmes: PersonPostData['programmes']
  ): PersonPostData['programmes'] => {
    const result: PersonPostData['programmes'] = [];
    programmes.forEach((p) => {
      p.classes.forEach((c) => {
        result.push({
          ...p,
          classes: [c],
        });
      });
    });
    return result;
  };

  const condenseProgrammes = (
    programmes: PersonPostData['programmes']
  ): number[] => {
    const result: number[] = [];
    programmes.forEach((p) => {
      p.classes.forEach((c) => {
        result.push(c.id);
      });
    });
    return result;
  };

  const [state, setState] = useReducer(
    (s: TeacherFormState, a: Partial<TeacherFormState>) => ({
      ...s,
      ...a,
    }),
    {
      name: teacher?.name ?? '',
      gender: teacher?.gender ?? Gender.MALE,
      birthday: teacher?.birthday ? new Date(teacher.birthday) : null,
      mobileNumber: teacher?.mobileNumber ?? '',
      homeNumber: teacher?.homeNumber ?? '',
      email: teacher?.email ?? '',
      programmes: teacher?.programmes
        ? spreadProgrammes(teacher.programmes)
        : [],
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
    index: number,
    newProgrammeId: number
  ): void => {
    const newProgrammes = state.programmes.slice();
    const newProgramme = user!.programmes.find((p) => p.id === newProgrammeId)!;
    newProgrammes[index] = {
      id: newProgramme.id,
      classes: [
        newProgramme.classes.filter(
          (c) => c.role !== ClassPersonRole.STUDENT
        )[0],
      ],
    };
    setState({ programmes: newProgrammes });
  };

  const handleClassChange = (index: number, newClassId: number): void => {
    const newProgrammes = state.programmes.slice();
    newProgrammes[index].classes = availableClasses.filter(
      (c) => c.id === newClassId
    );
    setState({ programmes: newProgrammes });
  };

  const handleAdd = async () => {
    if (!validateTeacherInfo(state)) {
      setHasError(true);
      return;
    }
    setHasError(false);
    // TODO: Add loading
    try {
      const response = await ApiService.post(`${TEACHERS}`, {
        ...state,
        classIds: condenseProgrammes(state.programmes),
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

  const handleEdit = async () => {
    if (!validateTeacherInfo(state) || !teacher) {
      setHasError(true);
      return;
    }
    setHasError(false);
    // TODO: Add loading
    try {
      const response = await ApiService.patch(`persons/${teacher.id}`, {
        ...state,
        programmes: condenseProgrammes(state.programmes),
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

  const handleDeleteActivity = (index: number) => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'You will not be able to retrieve the deleted activity.',
      () => {
        const newProgrammes = state.programmes.slice();
        newProgrammes.splice(index, 1);
        setState({ programmes: newProgrammes });
      },
      undefined
    );
  };

  const renderButtons = () => {
    switch (mode) {
      case TeacherMode.NEW:
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
              Add Teacher
            </QuestButton>
          </Grid>
        );
      case TeacherMode.EDIT:
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
              {mode === TeacherMode.NEW && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  Add Teacher Info {isSuccessful && ' - Successful'}
                </Typography>
              )}
              {mode === TeacherMode.EDIT && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  Edit Teacher Info {isSuccessful && ' - Successful'}
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
                        <MenuItem value={Gender.MALE}>Male</MenuItem>
                        <MenuItem value={Gender.FEMALE}>Female</MenuItem>
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
              {state.programmes
                .filter((p) =>
                  user!.programmes.map((p2) => p2.id).includes(p.id)
                )
                .map((p, index) => {
                  return p.classes.map((c) => {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <Grid container key={`${p}-${index}`}>
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
                                  value={p.id}
                                  onChange={(
                                    event: React.ChangeEvent<{ value: unknown }>
                                  ) =>
                                    handleProgrammeChange(
                                      index,
                                      Number(event.target.value)
                                    )
                                  }
                                  disabled={isSuccessful}
                                >
                                  {user!.programmes
                                    .slice()
                                    .sort(sortByName)
                                    .map((p) => {
                                      return (
                                        <MenuItem
                                          value={p.id}
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
                              <Typography variant="subtitle1">
                                Class:
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
                                  id="select-classes"
                                  value={c.id}
                                  onChange={(
                                    event: React.ChangeEvent<{ value: unknown }>
                                  ) =>
                                    handleClassChange(
                                      index,
                                      Number(event.target.value)
                                    )
                                  }
                                  disabled={isSuccessful}
                                >
                                  {user!.programmes
                                    .find((p2) => p2.id === p.id)!
                                    .classes.map((c2) => {
                                      return (
                                        <MenuItem
                                          value={c2.id}
                                          key={`class-${c2.id}`}
                                        >
                                          {c2.name}
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
                            <Grid
                              item
                              xs={8}
                              style={{
                                paddingLeft: '1rem',
                                marginBottom: '0.75rem',
                              }}
                            >
                              {hasError &&
                                state.programmes.filter(
                                  (x) =>
                                    x.id === p.id &&
                                    x.classes[0].id === p.classes[0].id
                                ).length > 1 && (
                                  <FormHelperText style={{ color: 'red' }}>
                                    This activity is duplicated!
                                  </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={4}>
                              <Grid container justify="flex-end">
                                <IconButton
                                  aria-label="delete"
                                  style={{
                                    color: 'red',
                                    marginBottom: '0.5rem',
                                  }}
                                  onClick={() => handleDeleteActivity(index)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    );
                  });
                })}
              {!isSuccessful && (
                <FormControl
                  style={{
                    width: '100%',
                  }}
                  error={hasError && state.programmes.length === 0}
                >
                  {hasError && state.programmes.length === 0 && (
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
                      if (user!.programmes.length === 0) {
                        alertCallback(
                          true,
                          false,
                          'You cannot add activities!',
                          'You need to be part of a programme to add teachers to it.',
                          undefined,
                          undefined
                        );
                        return;
                      }
                      if (
                        user!.programmes
                          .map((p) => p.classes.length)
                          .reduce((a, b) => a + b, 0) === 0
                      ) {
                        alertCallback(
                          true,
                          false,
                          'You cannot add activities!',
                          'You need to create classes first for the teacher to join.',
                          undefined,
                          undefined
                        );
                        return;
                      }
                      const newProgrammes = state.programmes.slice();
                      newProgrammes.push({
                        ...availableProgrammes[0],
                        classes: [availableProgrammes[0].classes[0]],
                      });
                      setState({ programmes: newProgrammes });
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

export default TeacherForm;
