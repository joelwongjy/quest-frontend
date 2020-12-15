import React, { useReducer, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  List,
  ListItem,
  TextField,
  IconButton,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import { DatePicker } from '@material-ui/pickers';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { isBefore } from 'date-fns';

import QuestCard from 'componentWrappers/questCard';
import QuestTextField from 'componentWrappers/questTextField';
import QuestButton from 'componentWrappers/questButton';
import { ProgrammePostData } from 'interfaces/api/programmes';
import { ClassData } from 'interfaces/api/classes';
import { ClassUserRole } from 'interfaces/models/classUsers';
import { ProgrammeListData, ProgrammeMode } from 'interfaces/models/programmes';
import { useError } from 'contexts/ErrorContext';
import { validateProgrammeInfo } from 'utils/programmeUtils';
import { useUser } from 'contexts/UserContext';

import { useStyles } from './ProgrammeForm.styles';

interface ProgrammeFormProps {
  mode: ProgrammeMode;
  programme?: ProgrammeListData;
  programmeCallback?: (newProgramme: ProgrammeListData) => void;
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

export interface ProgrammeFormState
  extends Omit<Omit<ProgrammePostData, 'startAt'>, 'endAt'> {
  startAt: Date | null;
  endAt: Date | null;
}
const ProgrammeForm: React.FC<ProgrammeFormProps> = ({
  mode,
  programme,
  cancelCallback,
  alertCallback,
}) => {
  const classes = useStyles();
  const { hasError, setHasError } = useError();
  const user = useUser();

  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const [state, setState] = useReducer(
    (s: ProgrammeFormState, a: Partial<ProgrammeFormState>) => ({
      ...s,
      ...a,
    }),
    {
      id: programme?.id ?? user?.programmes.length ?? 0 + 1,
      name: programme?.name ?? '',
      description: programme?.description ?? '',
      startAt: programme?.startAt ?? new Date(),
      endAt: programme?.endAt ?? new Date(),
      classes: programme?.classes ?? [],
    }
  );

  const handleClassEdit = (
    index: number,
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    const newClasses = state.classes.slice();
    newClasses[index].name = event.target.value as string;
    setState({ classes: newClasses });
  };

  const handleDeleteClass = (index: number) => {
    if (!state.classes[index] || state.classes[index].name.length === 0) {
      const newClasses = [...state.classes];
      newClasses.splice(index, 1);
      setState({ classes: newClasses });
    } else {
      alertCallback(
        true,
        true,
        'Are you sure?',
        'You will not be able to retrieve deleted class',
        () => {
          const newClasses = [...state.classes];
          newClasses.splice(index, 1);
          setState({ ...classes, classes: newClasses });
        },
        undefined
      );
    }
  };

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

  const handleAddClass = () => {
    const newClass: ClassData = {
      name: '',
      role: ClassUserRole.STUDENT,
    };
    setState({ classes: [...state.classes, newClass] });
  };

  const handleAdd = () => {
    if (!validateProgrammeInfo(state)) {
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
    if (!validateProgrammeInfo(state)) {
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

  const renderButtons = () => {
    switch (mode) {
      case ProgrammeMode.NEW:
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
              Add Programme
            </QuestButton>
          </Grid>
        );
      case ProgrammeMode.EDIT:
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
              {mode === ProgrammeMode.NEW && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  Add Programme {isSuccessful && ' - Successful'}
                </Typography>
              )}
              {mode === ProgrammeMode.EDIT && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  Edit Programme {isSuccessful && ' - Successful'}
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
                  Programme Details:
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
                          label="Programme Name"
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
                    <Typography variant="subtitle1">Description: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <div className={classes.textfieldContainer}>
                      <QuestTextField
                        size="small"
                        value={state.description}
                        className={classes.textfield}
                        label="Description"
                        variant="outlined"
                        disabled={isSuccessful}
                        onChange={(e) =>
                          setState({ description: e.target.value })
                        }
                      />
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Start Date: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl
                      style={{ width: '100%' }}
                      error={
                        hasError &&
                        (state.startAt === null ||
                          !isBefore(
                            state.startAt ?? new Date(),
                            state.endAt ?? new Date()
                          ))
                      }
                    >
                      <DatePicker
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
                        value={state.startAt}
                        onChange={(newDate: Date | null) => {
                          setState({ startAt: newDate });
                        }}
                      />
                      {hasError && state.startAt === null && (
                        <FormHelperText>
                          The start date cannot be blank!
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">End Date: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl
                      style={{ width: '100%' }}
                      error={
                        hasError &&
                        (state.endAt === null ||
                          !isBefore(
                            state.startAt ?? new Date(),
                            state.endAt ?? new Date()
                          ))
                      }
                    >
                      <DatePicker
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
                        value={state.endAt}
                        onChange={(newDate: Date | null) => {
                          setState({ endAt: newDate });
                        }}
                      />
                      {hasError && state.endAt === null && (
                        <FormHelperText>
                          The end date cannot be blank!
                        </FormHelperText>
                      )}
                      {hasError &&
                        !isBefore(
                          state.startAt ?? new Date(),
                          state.endAt ?? new Date()
                        ) && (
                          <FormHelperText>
                            The end date must be after the start date!
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Typography variant="h6" className={classes.subheader}>
                  Classes:
                </Typography>
              </ListItem>
              {state.classes.map((c, index) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Grid container key={`${c}-${index}`}>
                    <ListItem>
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={4}>
                          <Typography variant="subtitle1">
                            Class {index + 1}:
                          </Typography>
                        </Grid>
                        <Grid item xs={isSuccessful ? 8 : 7}>
                          <div className={classes.textfieldContainer}>
                            <FormControl
                              style={{ width: '100%' }}
                              error={
                                hasError && state.classes[index].name === ''
                              }
                            >
                              <QuestTextField
                                required
                                size="small"
                                className={classes.textfield}
                                label="Class Name"
                                variant="outlined"
                                disabled={isSuccessful}
                                onChange={(e) => handleClassEdit(index, e)}
                              />
                              {hasError && state.classes[index].name === '' && (
                                <FormHelperText>
                                  The name cannot be blank!
                                </FormHelperText>
                              )}
                            </FormControl>
                          </div>
                        </Grid>
                        {!isSuccessful && (
                          <Grid item xs={1}>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDeleteClass(index)}
                              style={{ marginLeft: '0.5rem' }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        )}
                      </Grid>
                    </ListItem>
                  </Grid>
                );
              })}
              {!isSuccessful && (
                <ListItem>
                  <QuestCard
                    onClick={handleAddClass}
                    className={classes.addCard}
                  >
                    <AddCircleIcon className={classes.addIcon} />
                    Add a class
                  </QuestCard>
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

export default ProgrammeForm;
