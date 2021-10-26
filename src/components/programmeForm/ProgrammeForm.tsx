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
import { PROGRAMMES } from 'constants/routes';
import { useError } from 'contexts/ErrorContext';
import { ProgrammeMode } from 'interfaces/components/programmeForm';
import {
  ProgrammeListData,
  ProgrammePatchData,
  ProgrammePostData,
} from 'interfaces/models/programmes';
import ApiService from 'services/apiService';
import AuthService from 'services/authService';
import { programmeFormIsChanged } from 'utils/programmeUtils';

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

export type ProgrammeFormState = ProgrammePostData | ProgrammePatchData;

const ProgrammeForm: React.FC<ProgrammeFormProps> = ({
  mode,
  programme,
  cancelCallback,
  alertCallback,
}) => {
  const classes = useStyles();
  const { hasError, setHasError } = useError();

  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const [state, setState] = useReducer(
    (s: ProgrammeFormState, a: Partial<ProgrammeFormState>) => ({
      ...s,
      ...a,
    }),
    {
      name: programme?.name ?? '',
      description: programme?.description ?? '',
    }
  );

  const handleCancel = () => {
    if (isSuccessful || !programmeFormIsChanged(mode, state, programme)) {
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

    try {
      const response = await ApiService.post(`${PROGRAMMES}`, state);
      if (response.status === 200) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        setIsSuccessful(true);
        await AuthService.getUser();
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      // TODO: Add error handling here
    }
  };

  const handleEdit = async () => {
    if (state.name === '' || !programme) {
      setHasError(true);
      return;
    }
    setHasError(false);

    try {
      const response = await ApiService.patch(
        `programmes/${programme!.id}`,
        state
      );
      if (response.status === 200) {
        window.scrollTo({
          top: 0,
          behavior: 'auto',
        });
        setIsSuccessful(true);
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
                  Add Programme{isSuccessful && ' - Successful'}
                </Typography>
              )}
              {mode === ProgrammeMode.EDIT && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  Edit Programme{isSuccessful && ' - Successful'}
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
