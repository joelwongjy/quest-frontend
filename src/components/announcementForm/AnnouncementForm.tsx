import React, { useReducer, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { DatePicker } from '@material-ui/pickers';

import ProgrammeClassPicker from 'components/programmeClassPicker';
import QuestButton from 'componentWrappers/questButton';
import QuestCard from 'componentWrappers/questCard';
import QuestTextField from 'componentWrappers/questTextField';
import { ANNOUNCEMENTS, TEACHERS } from 'constants/routes';
import { useError } from 'contexts/ErrorContext';
import { useUser } from 'contexts/UserContext';
import {
  AnnouncementListData,
  AnnouncementMode,
  AnnouncementPostData,
} from 'interfaces/models/announcements';
import ApiService from 'services/apiService';
import { validateAnnouncementInfo } from 'utils/announcementUtils';

import { useStyles } from './announcementForm.styles';

interface AnnouncementFormProps {
  mode: AnnouncementMode;
  announcement?: AnnouncementListData;
  announcementCallback?: (newAnnouncement: AnnouncementPostData) => void;
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

export type AnnouncementFormState = AnnouncementPostData;

const AnnouncementForm: React.FunctionComponent<AnnouncementFormProps> = ({
  mode,
  announcement,
  cancelCallback,
  alertCallback,
}) => {
  const { user } = useUser();
  const classes = useStyles();
  const { hasError, setHasError } = useError();

  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [selectedProgrammes, setSelectedProgrammes] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedClasses, setSelectedClasses] = useState<
    { id: number; name: string }[]
  >([]);

  const [state, setState] = useReducer(
    (s: AnnouncementFormState, a: Partial<AnnouncementFormState>) => ({
      ...s,
      ...a,
    }),
    {
      title: '',
      startDate: Date(),
      endDate: Date(),
      body: '',
      programmeIds: [],
      classIds: [],
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
    if (!validateAnnouncementInfo(state)) {
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
    if (!validateAnnouncementInfo(state) || !announcement) {
      setHasError(true);
      return;
    }
    setHasError(false);
    // TODO: Add loading
    try {
      const response = await ApiService.patch(
        `${ANNOUNCEMENTS}/${announcement.id}`,
        {
          ...state,
        }
      );
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

  const programmeCallback = (newProgrammes: { id: number; name: string }[]) => {
    setSelectedProgrammes(newProgrammes);
  };

  const classCallback = (newClasses: { id: number; name: string }[]) => {
    setSelectedClasses(newClasses);
  };

  const renderButtons = () => {
    switch (mode) {
      case AnnouncementMode.NEW:
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
              Create Announcement
            </QuestButton>
          </Grid>
        );
      case AnnouncementMode.EDIT:
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
              {mode === AnnouncementMode.NEW && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  New Announcement Info {isSuccessful && ' - Successful'}
                </Typography>
              )}
              {mode === AnnouncementMode.EDIT && (
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ color: 'white' }}
                >
                  Edit Announcement Info {isSuccessful && ' - Successful'}
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
                  Details:
                </Typography>
              </ListItem>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Title: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <div className={classes.textfieldContainer}>
                      <FormControl
                        style={{ width: '100%' }}
                        error={hasError && state.title === ''}
                      >
                        <QuestTextField
                          required
                          size="small"
                          value={state.title}
                          className={classes.textfield}
                          label="Title"
                          variant="outlined"
                          disabled={isSuccessful}
                          onChange={(e) => setState({ title: e.target.value })}
                        />
                        {hasError && state.title === '' && (
                          <FormHelperText>
                            The title cannot be blank!
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
                    <Typography variant="subtitle1">Start Date: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl
                      style={{ width: '100%' }}
                      error={hasError && state.startDate === null}
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
                        value={state.startDate}
                        onChange={(newDate: Date | null) => {
                          setState({ startDate: newDate ?? undefined });
                        }}
                      />
                      {hasError && state.startDate === null && (
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
                      error={hasError && state.endDate === null}
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
                        value={state.endDate}
                        onChange={(newDate: Date | null) => {
                          setState({ endDate: newDate ?? undefined });
                        }}
                      />
                      {hasError && state.startDate === null && (
                        <FormHelperText>
                          The endDate date cannot be blank!
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Body: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <div className={classes.textfieldContainer}>
                      <FormControl
                        style={{ width: '100%' }}
                        error={hasError && state.body?.length === 0}
                      >
                        <QuestTextField
                          size="small"
                          className={classes.textfield}
                          label="Body"
                          variant="outlined"
                          disabled={isSuccessful}
                          multiline
                          rows={3}
                          onChange={(e) => setState({ body: e.target.value })}
                        />
                        {hasError && state.body && state.body?.length === 0 && (
                          <FormHelperText>
                            Please fill up the body of the annoucement!
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Typography variant="h6" className={classes.subheader}>
                  Assign the announcement:
                </Typography>
              </ListItem>
              <ListItem>
                <ProgrammeClassPicker
                  programmes={user!.programmes}
                  selectedClasses={selectedClasses}
                  selectedProgrammes={selectedProgrammes}
                  programmeCallback={programmeCallback}
                  classCallback={classCallback}
                />
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

export default AnnouncementForm;
