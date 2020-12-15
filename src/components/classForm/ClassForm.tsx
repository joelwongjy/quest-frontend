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
import CloseIcon from '@material-ui/icons/Close';

import QuestCard from 'componentWrappers/questCard';
import QuestTextField from 'componentWrappers/questTextField';
import QuestButton from 'componentWrappers/questButton';
import { ClassData, ClassPostData } from 'interfaces/api/classes';
import { ProgrammePostData } from 'interfaces/api/programmes';
import { ClassListData, ClassMode } from 'interfaces/models/classes';
import { ClassUserRole } from 'interfaces/models/classUsers';
import { ProgrammeListData } from 'interfaces/models/programmes';
import { useError } from 'contexts/ErrorContext';

import { useStyles } from './ClassForm.styles';

interface ClassFormProps {
  mode: ClassMode;
  questClass?: ClassListData;
  programme: ProgrammeListData;
  classCallback?: (newClass: ClassListData) => void;
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

export type ClassFormState = ClassPostData;

const ClassForm: React.FC<ClassFormProps> = ({
  mode,
  questClass,
  programme,
  cancelCallback,
  alertCallback,
}) => {
  const classes = useStyles();
  const { hasError, setHasError } = useError();
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const [state, setState] = useReducer(
    (s: ClassFormState, a: Partial<ClassFormState>) => ({
      ...s,
      ...a,
    }),
    {
      id: questClass?.id ?? programme.classes.length,
      name: questClass?.name ?? '',
      role: questClass?.role ?? ClassUserRole.STUDENT,
      programme,
    }
  );

  const handleCancel = () => {
    if (
      isSuccessful ||
      state.name === '' ||
      (mode === ClassMode.EDIT && state.name === questClass!.name)
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
    const newClass: ClassData = {
      id: state.id,
      name: state.name,
      role: state.role,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newProgramme: ProgrammePostData = {
      id: state.programme.id,
      name: state.programme.name,
      description: state.programme.description,
      classes: [...state.programme.classes, newClass],
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
    const newClass: ClassData = {
      id: state.id,
      name: state.name,
      role: state.role,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newProgramme: ProgrammePostData = {
      id: state.programme.id,
      name: state.programme.name,
      description: state.programme.description,
      classes: [
        ...state.programme.classes.filter((c) => c.id !== questClass!.id),
        newClass,
      ],
    };
    // TODO: Post the data over
  };

  const renderButtons = () => {
    switch (mode) {
      case ClassMode.NEW:
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
              Add Class
            </QuestButton>
          </Grid>
        );
      case ClassMode.EDIT:
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
              {mode === ClassMode.NEW && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  Add Class {isSuccessful && ' - Successful'}
                </Typography>
              )}
              {mode === ClassMode.EDIT && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  Edit Class {isSuccessful && ' - Successful'}
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
                  {programme.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Name of Class: </Typography>
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
                          label="Class Name"
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

export default ClassForm;
