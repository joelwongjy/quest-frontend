import React, { useReducer, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  List,
  ListItem,
  IconButton,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

import QuestCard from 'componentWrappers/questCard';
import QuestTextField from 'componentWrappers/questTextField';
import QuestButton from 'componentWrappers/questButton';
import { ProgrammePostData } from 'interfaces/api/programmes';
import { ClassData } from 'interfaces/api/classes';
import { ClassUserRole } from 'interfaces/models/classUsers';
import { ProgrammeListData, ProgrammeMode } from 'interfaces/models/programmes';
import { useError } from 'contexts/ErrorContext';
import { programmeFormIsChanged } from 'utils/programmeUtils';
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

export interface ProgrammeFormState extends ProgrammePostData {
  classesAdded: number;
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
      id: programme?.id ?? user?.programmes.length ?? 0,
      name: programme?.name ?? '',
      description: programme?.description ?? '',
      classes: programme?.classes ?? [],
      classesAdded: 0,
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
      setState({ classes: newClasses, classesAdded: state.classesAdded - 1 });
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
    if (
      isSuccessful ||
      (!programmeFormIsChanged(mode, state, programme) &&
        state.classesAdded === 0)
    ) {
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
      id: state.classes.length,
      name: '',
      role: ClassUserRole.STUDENT,
    };
    setState({
      classes: [...state.classes, newClass],
      classesAdded: state.classesAdded + 1,
    });
  };

  const handleAdd = () => {
    if (state.name === '') {
      setHasError(true);
      return;
    }
    setHasError(false);
    setIsSuccessful(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newProgramme: ProgrammePostData = {
      id: state.id,
      name: state.name,
      description: state.description,
      classes: state.classes,
    };
    // TODO: Post the data over
  };

  const handleEdit = () => {
    if (state.name === '') {
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
