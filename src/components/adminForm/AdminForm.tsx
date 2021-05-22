import React, { useReducer, useState } from 'react';
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
import CloseIcon from '@material-ui/icons/Close';
import { DatePicker } from '@material-ui/pickers';

import QuestButton from 'componentWrappers/questButton';
import QuestCard from 'componentWrappers/questCard';
import QuestTextField from 'componentWrappers/questTextField';
import { TEACHERS } from 'constants/routes';
import { useError } from 'contexts/ErrorContext';
import { Gender, PersonData, PersonPostData } from 'interfaces/models/persons';
import { AdminMode } from 'interfaces/models/users';
import ApiService from 'services/apiService';
import { validateAdminInfo } from 'utils/adminUtils';
import { isValidEmail, isValidMobileNumber } from 'utils/personUtils';

import { useStyles } from './adminForm.styles';

interface AdminFormProps {
  mode: AdminMode;
  teacher?: PersonData;
  teacherCallback?: (newAdmin: PersonData) => void;
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

export interface AdminFormState extends Omit<PersonPostData, 'birthday'> {
  birthday: Date | null;
}

const AdminForm: React.FunctionComponent<AdminFormProps> = ({
  mode,
  teacher,
  cancelCallback,
  alertCallback,
}) => {
  const classes = useStyles();
  const { hasError, setHasError } = useError();

  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const [state, setState] = useReducer(
    (s: AdminFormState, a: Partial<AdminFormState>) => ({
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
      programmes: [],
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

  const handleAdd = async () => {
    if (!validateAdminInfo(state)) {
      setHasError(true);
      return;
    }
    setHasError(false);
    // TODO: Add loading
    try {
      const response = await ApiService.post(`${TEACHERS}`, {
        ...state,
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
    if (!validateAdminInfo(state) || !teacher) {
      setHasError(true);
      return;
    }
    setHasError(false);
    // TODO: Add loading
    try {
      const response = await ApiService.patch(`persons/${teacher.id}`, {
        ...state,
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

  const renderButtons = () => {
    switch (mode) {
      case AdminMode.NEW:
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
              Add Admin
            </QuestButton>
          </Grid>
        );
      case AdminMode.EDIT:
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
              {mode === AdminMode.NEW && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  Add Admin Info {isSuccessful && ' - Successful'}
                </Typography>
              )}
              {mode === AdminMode.EDIT && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  Edit Admin Info {isSuccessful && ' - Successful'}
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

export default AdminForm;
