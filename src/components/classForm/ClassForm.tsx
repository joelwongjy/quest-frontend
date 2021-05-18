import React, { useReducer, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import QuestButton from 'componentWrappers/questButton';
import QuestCard from 'componentWrappers/questCard';
import QuestTextField from 'componentWrappers/questTextField';
import { useError } from 'contexts/ErrorContext';
import { ClassMode } from 'interfaces/components/classForm';
import { ClassListData } from 'interfaces/models/classes';
import {
  ProgrammeData,
  ProgrammePatchData,
} from 'interfaces/models/programmes';
import ApiService from 'services/apiService';
import AuthService from 'services/authService';

import { useStyles } from './ClassForm.styles';

interface ClassFormProps {
  mode: ClassMode;
  questClass?: ClassListData;
  programme: ProgrammeData;
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

export type ClassFormState = ProgrammePatchData;

const ClassForm: React.FC<ClassFormProps> = ({
  mode,
  questClass,
  programme,
  cancelCallback,
  alertCallback,
}) => {
  const styles = useStyles();
  const { hasError, setHasError } = useError();
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const [state, setState] = useReducer(
    (s: ClassFormState, a: Partial<ClassFormState>) => ({
      ...s,
      ...a,
    }),
    {
      name: questClass?.name ?? '',
      description: questClass?.description ?? '',
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

  const handleAdd = async () => {
    if (state.name === '') {
      setHasError(true);
      return;
    }
    setHasError(false);
    // TODO: Add loading
    try {
      const newClasses: ProgrammePatchData['classes'] = programme.classes
        .slice()
        .map((c) => {
          return {
            id: c.id,
            name: c.name,
            description: c.description,
          };
        });
      newClasses.push({
        name: state.name!,
        description: state.description,
      });

      const programmePatchData: ProgrammePatchData = {
        classes: newClasses,
      };
      const response = await ApiService.patch(
        `programmes/${programme.id}`,
        programmePatchData
      );
      if (response.status === 200) {
        setIsSuccessful(true);
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        await AuthService.getUser();
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      // TODO: Add error handling here
    }
  };

  const handleEdit = async () => {
    if (state.name === '' || !questClass) {
      setHasError(true);
      return;
    }
    setHasError(false);
    // TODO: Add loading
    try {
      const response = await ApiService.patch(
        `classes/${questClass.id}`,
        state
      );
      if (response.status === 200) {
        setIsSuccessful(true);
        window.scrollTo({
          top: 0,
          behavior: 'auto',
        });
        await AuthService.getUser();
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      // TODO: Add error handling here
    }
  };

  const renderButtons = () => {
    switch (mode) {
      case ClassMode.NEW:
        return (
          <Grid container spacing={2} justify="flex-end">
            <QuestButton
              className={styles.button}
              variant="outlined"
              onClick={handleCancel}
            >
              Cancel
            </QuestButton>
            <QuestButton className={styles.button} onClick={handleAdd}>
              Add Class
            </QuestButton>
          </Grid>
        );
      case ClassMode.EDIT:
        return (
          <Grid container spacing={2} justify="flex-end">
            <QuestButton
              className={styles.button}
              variant="outlined"
              onClick={handleCancel}
            >
              Discard Changes
            </QuestButton>
            <QuestButton className={styles.button} onClick={handleEdit}>
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
            className={isSuccessful ? styles.headerSuccess : styles.header}
          >
            <Grid container alignItems="center" justify="space-between">
              {mode === ClassMode.NEW && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  Add Class{isSuccessful && ' - Successful'}
                </Typography>
              )}
              {mode === ClassMode.EDIT && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  Edit Class{isSuccessful && ' - Successful'}
                </Typography>
              )}
              <IconButton onClick={handleCancel}>
                <CloseIcon style={{ color: 'white', fontSize: 36 }} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <List className={styles.list}>
              <ListItem>
                <Typography variant="h6" className={styles.subheader}>
                  {programme.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Name of Class: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <div className={styles.textfieldContainer}>
                      <FormControl
                        style={{ width: '100%' }}
                        error={hasError && state.name === ''}
                      >
                        <QuestTextField
                          required
                          size="small"
                          value={state.name}
                          className={styles.textfield}
                          label="Class Name"
                          variant="outlined"
                          disabled={isSuccessful}
                          onChange={(e) => setState({ name: e.target.value })}
                        />
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Descirption: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <div className={styles.textfieldContainer}>
                      <FormControl
                        style={{ width: '100%' }}
                        error={hasError && state.name === ''}
                      >
                        <QuestTextField
                          size="small"
                          value={state.description}
                          className={styles.textfield}
                          label="Description"
                          variant="outlined"
                          disabled={isSuccessful}
                          onChange={(e) =>
                            setState({ description: e.target.value })
                          }
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
                    className={styles.button}
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
