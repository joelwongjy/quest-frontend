import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormControl, FormHelperText, Grid } from '@material-ui/core';
import { addMinutes, differenceInMinutes, isAfter, isBefore } from 'date-fns';
import { addDays } from 'date-fns/esm';

import AnnouncementForm from 'components/announcementForm';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import ProgrammeClassPicker from 'components/programmeClassPicker';
import QuestAccordion from 'componentWrappers/questAccordion';
import QuestAlert from 'componentWrappers/questAlert';
import QuestButton from 'componentWrappers/questButton';
import QuestDateTimePicker from 'componentWrappers/questDateTimePicker';
import QuestTextField from 'componentWrappers/questTextField';
import { ANNOUNCEMENTS, CREATE, HOME } from 'constants/routes';
import { useError } from 'contexts/ErrorContext';
import { useUser } from 'contexts/UserContext';
import { AnnouncementMode } from 'interfaces/models/announcements';
// import { useError } from 'contexts/ErrorContext';
import { RouteState } from 'interfaces/routes/common';
import AssignAccordion from 'routes/questionnaires/assignAccordion';
import { getAlertCallback } from 'utils/alertUtils';

import { useStyles } from './createAnnouncements.styles';

type CreateAnnouncementState = RouteState;

const CreateAnnouncements: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useUser();
  const { hasError, setHasError } = useError();

  const breadcrumbs = [
    { text: 'Announcements', href: HOME },
    { text: 'Create', href: `${ANNOUNCEMENTS}/${CREATE}` },
  ];

  const [state, setState] = useReducer(
    (s: CreateAnnouncementState, a: Partial<CreateAnnouncementState>) => ({
      ...s,
      ...a,
    }),
    {
      isLoading: true,
      isError: false,
      isAlertOpen: false,
      alertHeader: '',
      alertMessage: '',
      hasConfirm: false,
      closeHandler: () => {
        setState({ isAlertOpen: false });
      },
      confirmHandler: () => {
        setState({ isAlertOpen: false });
      },
      cancelHandler: () => {
        setState({ isAlertOpen: false });
      },
    }
  );

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 7));
  const [selectedProgrammes, setSelectedProgrammes] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedClasses, setSelectedClasses] = useState<
    { id: number; name: string }[]
  >([]);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const [hasStartError, setHasStartError] = useState<boolean>(false);
  const [hasEndError, setHasEndError] = useState<boolean>(false);
  const hasTitleError = hasError && title === '';

  const alertCallback = getAlertCallback(setState);

  const handleEndDate = (end: Date) => {
    if (isBefore(end, startDate)) {
      setHasEndError(true);
    } else {
      setHasEndError(false);
    }
    setEndDate(end);
  };

  const handleStartDate = (start: Date) => {
    if (isBefore(start, new Date())) {
      setHasStartError(true);
    } else if (isAfter(start, startDate)) {
      const difference = differenceInMinutes(start, startDate);
      setEndDate(addMinutes(endDate, difference));
      setHasStartError(false);
    } else if (isBefore(start, endDate)) {
      setHasStartError(false);
    }
    setStartDate(start);
  };

  const programmeCallback = (newProgrammes: { id: number; name: string }[]) => {
    setSelectedProgrammes(newProgrammes);
  };

  const classCallback = (newClasses: { id: number; name: string }[]) => {
    setSelectedClasses(newClasses);
  };

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <QuestAccordion heading="Step 1: Set the time frame">
            <Grid container justify="space-around">
              <Grid item xs={10}>
                <Grid container justify="space-around">
                  <Grid container justify="space-around">
                    <div className={classes.container}>
                      <FormControl>
                        <QuestDateTimePicker
                          date={startDate}
                          callback={handleStartDate}
                          label="Start Date & Time"
                        />
                      </FormControl>
                    </div>
                    <div className={classes.container}>
                      <FormControl error={hasEndError}>
                        <QuestDateTimePicker
                          date={endDate}
                          callback={handleEndDate}
                          label="End Date & Time"
                        />
                        {hasEndError && (
                          <FormHelperText className={classes.errorMessage}>
                            The end date must be after the start date!
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </QuestAccordion>
          <QuestAccordion heading="Step 2: Assign the announcement">
            <ProgrammeClassPicker
              programmes={user!.programmes}
              selectedClasses={selectedClasses}
              selectedProgrammes={selectedProgrammes}
              programmeCallback={programmeCallback}
              classCallback={classCallback}
            />
          </QuestAccordion>
          <QuestAccordion heading="Step 3: Create the announcement">
            <Grid container>
              <FormControl
                error={hasTitleError}
                className={classes.inputContainer}
              >
                <QuestTextField
                  className={classes.input}
                  placeholder="Enter Title of Announcement"
                  variant="outlined"
                  value={title}
                  margin="normal"
                  onChange={(e) => setTitle(e.target.value)}
                  error={hasError && title === ''}
                />
                {hasTitleError && (
                  <FormHelperText>The title cannot be empty!</FormHelperText>
                )}
              </FormControl>
              <FormControl
                error={hasTitleError}
                className={classes.bodyContainer}
              >
                <QuestTextField
                  className={classes.body}
                  placeholder="Enter Body of Announcement"
                  variant="outlined"
                  value={title}
                  margin="normal"
                  multiline
                  rows={3}
                  onChange={(e) => setTitle(e.target.value)}
                  error={hasError && title === ''}
                />
                {hasTitleError && (
                  <FormHelperText>The title cannot be empty!</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </QuestAccordion>
          <Grid container justify="flex-end">
            <QuestButton
              onClick={() => {
                console.log('Hello');
              }}
              fullWidth
            >
              Finish
            </QuestButton>
          </Grid>
        </Grid>
      </Grid>
      <QuestAlert
        isAlertOpen={state.isAlertOpen!}
        hasConfirm={state.hasConfirm!}
        alertHeader={state.alertHeader!}
        alertMessage={state.alertMessage!}
        closeHandler={state.closeHandler!}
        confirmHandler={state.confirmHandler}
        cancelHandler={state.cancelHandler}
      />
    </PageContainer>
  );
};

export default CreateAnnouncements;
