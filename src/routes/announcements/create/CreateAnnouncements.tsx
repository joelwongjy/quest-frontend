import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormControl, FormHelperText, Grid } from '@material-ui/core';
import { addMinutes, differenceInMinutes, isAfter, isBefore } from 'date-fns';
import { addDays } from 'date-fns/esm';

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
import {
  AnnouncementMode,
  AnnouncementPostData,
} from 'interfaces/models/announcements';
// import { useError } from 'contexts/ErrorContext';
import { RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { getAlertCallback } from 'utils/alertUtils';
import { validateAnnouncementInfo } from 'utils/announcementUtils';

import ConfirmAnnouncement from '../confirm/ConfirmAnnouncement';

import { useStyles } from './createAnnouncements.styles';

interface CreateAnnouncementState extends RouteState {
  isCompleted: boolean;
}

const CreateAnnouncements: React.FunctionComponent = () => {
  const muiClasses = useStyles();
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
      isCompleted: false,
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

  const [startDate, setStartDate] = useState<Date>(addMinutes(new Date(), 5));
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const handleComplete = async () => {
    if (
      title === '' ||
      body === '' ||
      !startDate ||
      !endDate ||
      (selectedProgrammes.length === 0 && selectedClasses.length === 0)
    ) {
      setHasError(true);
      return;
    }
    setHasError(false);
    setState({ isCompleted: true });
  };

  const programmeCallback = (newProgrammes: { id: number; name: string }[]) => {
    setSelectedProgrammes(newProgrammes);
  };

  const classCallback = (newClasses: { id: number; name: string }[]) => {
    setSelectedClasses(newClasses);
  };

  const handleSubmit = async () => {
    const data: AnnouncementPostData = {
      title,
      body,
      startDate,
      endDate,
      programmeIds: [],
      classIds: selectedClasses.map((c) => c.id),
    };
    if (!validateAnnouncementInfo(data)) {
      setHasError(true);
    }
    const response = await ApiService.post(`announcements`, data);
    if (response.status === 200) {
      history.push(HOME);
    }
  };

  const renderAnnouncement = () => {
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
                      <div className={muiClasses.container}>
                        <FormControl>
                          <QuestDateTimePicker
                            date={startDate}
                            callback={handleStartDate}
                            label="Start Date & Time"
                          />
                          {hasStartError && (
                            <FormHelperText className={muiClasses.errorMessage}>
                              The start date cannot be before the current time!
                            </FormHelperText>
                          )}
                        </FormControl>
                      </div>
                      <div className={muiClasses.container}>
                        <FormControl error={hasEndError}>
                          <QuestDateTimePicker
                            date={endDate}
                            callback={handleEndDate}
                            label="End Date & Time"
                          />
                          {hasEndError && (
                            <FormHelperText className={muiClasses.errorMessage}>
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
                  className={muiClasses.inputContainer}
                >
                  <QuestTextField
                    className={muiClasses.input}
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
                  className={muiClasses.bodyContainer}
                >
                  <QuestTextField
                    className={muiClasses.body}
                    placeholder="Enter Body of Announcement"
                    variant="outlined"
                    value={body}
                    margin="normal"
                    multiline
                    rows={3}
                    onChange={(e) => setBody(e.target.value)}
                    error={hasError && body === ''}
                  />
                  {hasError && body === '' && (
                    <FormHelperText>The body cannot be empty!</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </QuestAccordion>
            <Grid container justify="flex-end">
              <QuestButton onClick={handleComplete} fullWidth>
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

  return (
    <>
      {state.isCompleted ? (
        <ConfirmAnnouncement
          breadcrumbs={breadcrumbs}
          title={title}
          startDate={startDate}
          programmes={selectedProgrammes}
          classes={selectedClasses}
          handleCancel={() => setState({ isCompleted: false })}
          handleSubmit={handleSubmit}
          headerClassName={muiClasses.header}
          listClassName={muiClasses.list}
          buttonClassName={muiClasses.button}
          mode={AnnouncementMode.NEW}
        />
      ) : (
        renderAnnouncement()
      )}
    </>
  );
};

export default CreateAnnouncements;
