import React, { useEffect, useReducer, useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

import PageContainer from 'components/pageContainer';
import { RouteState } from 'interfaces/routes/common';
import { QuestionnaireListData } from 'interfaces/models/questionnaires';
import ApiService from 'services/apiService';
import { convertDateOfQuestionnaires } from 'utils/questionnaireUtils';
import { AttemptListData } from 'interfaces/models/attempts';
import { useUser } from 'contexts/UserContext';
import { getCompletedQuests, getNewQuests } from 'utils/questUtils';
import QuestionnaireCard from 'components/questionnaireCard';
import { CardMode } from 'interfaces/components/questionnaireCard';

import StudentBoard from 'components/studentBoard';
import mascotImage from '../../assets/images/student/mascot.png';
import { useStyles } from './quests.styles';
import QuestsGhost from './QuestsGhost';

interface QuestState extends RouteState {
  quests: QuestionnaireListData[];
  attempts: AttemptListData[];
  newQuestsWindow: QuestionnaireListData[];
  completedQuestsWindow: QuestionnaireListData[];
  newQuestsWindowIndex: number;
  completedQuestsWindowIndex: number;
}

const Quests: React.FC = () => {
  const classes = useStyles();
  const { user } = useUser();
  const [tabValue, setTabValue] = useState<number>(0);
  const [state, setState] = useReducer(
    (s: QuestState, a: Partial<QuestState>) => ({
      ...s,
      ...a,
    }),
    {
      quests: [],
      attempts: [],
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
      newQuestsWindow: [],
      completedQuestsWindow: [],
      newQuestsWindowIndex: 0,
      completedQuestsWindowIndex: 0,
    }
  );

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const questResponse = await ApiService.get('questionnaires');
        const quests = convertDateOfQuestionnaires(
          questResponse.data.questionnaires as QuestionnaireListData[]
        );

        const attemptResponse = await ApiService.get(
          'questionnaires/submissions'
        );
        if (!didCancel) {
          setState({
            quests,
            attempts: attemptResponse.data as AttemptListData[],
            isLoading: false,
          });
        }
      } catch (error) {
        if (!didCancel) {
          setState({
            isError: true,
            isLoading: false,
            isAlertOpen: true,
            alertHeader: 'Something went wrong',
            alertMessage: 'Please refresh the page and try again',
          });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, []);

  if (state.isLoading) {
    return <QuestsGhost />;
  }

  if (state.isError) {
    return <></>; // TODO: Add error handling
  }

  const newQuests = getNewQuests(
    state.quests,
    state.attempts,
    user!.programmes
  );
  const completedQuests = getCompletedQuests(
    state.quests,
    state.attempts,
    user!.programmes
  );

  const getNewQuestsWindow = (windowIndex: number) => {
    return newQuests.slice(windowIndex * 4, windowIndex * 4 + 4);
  };

  const getCompletedQuestsWindow = (windowIndex: number) => {
    return completedQuests.slice(windowIndex * 4, windowIndex * 4 + 4);
  };

  return (
    <PageContainer hasContentPadding={false}>
      <div className={classes.root}>
        <Grid xs={12} sm={10} md={9} lg={8} container justify="center">
          <StudentBoard title="Quests" className={classes.quests}>
            <ul className={classes.scrollable}>
              <Grid container className={classes.main}>
                <Grid container justify="center" style={{ margin: '1rem' }}>
                  <Button
                    style={{
                      textTransform: 'none',
                      textDecoration: tabValue === 0 ? 'underline' : undefined,
                      color: tabValue === 0 ? '#DA3501' : undefined,
                    }}
                    onClick={() => setTabValue(0)}
                  >
                    <Typography variant="h6">New</Typography>
                  </Button>
                  <Button
                    style={{
                      textTransform: 'none',
                      textDecoration: tabValue === 1 ? 'underline' : undefined,
                      color: tabValue === 1 ? '#DA3501' : undefined,
                    }}
                    onClick={() => setTabValue(1)}
                  >
                    <Typography variant="h6">Completed</Typography>
                  </Button>
                </Grid>
                <Grid container spacing={0} justify="space-around">
                  {tabValue === 0 &&
                    getNewQuestsWindow(state.newQuestsWindowIndex).map((q) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={9}
                          md={6}
                          key={`${q.quest.type}-${q.quest.name}-${q.quest.id}`}
                          style={{
                            margin: '1rem',
                          }}
                        >
                          <QuestionnaireCard
                            questionnaire={q.quest}
                            mode={CardMode.STUDENT}
                            programmeName={q.programme}
                            className={classes.card}
                          />
                        </Grid>
                      );
                    })}
                  <Grid container spacing={0} justify="space-around">
                    {tabValue === 1 &&
                      getCompletedQuestsWindow(
                        state.completedQuestsWindowIndex
                      ).map((q) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={8}
                            md={5}
                            key={`${q.quest.type}-${q.quest.name}-${q.quest.id}`}
                            style={{
                              margin: '1rem',
                            }}
                          >
                            <QuestionnaireCard
                              questionnaire={q.quest}
                              mode={CardMode.STUDENT}
                              programmeName={q.programme}
                              isAttempted
                            />
                          </Grid>
                        );
                      })}
                  </Grid>
                </Grid>
              </Grid>
              {tabValue === 0 && newQuests.length > 4 && (
                <Grid container className={classes.main}>
                  <Grid container justify="center" style={{ margin: '1rem' }}>
                    <Button
                      onClick={() => {
                        if (state.newQuestsWindowIndex > 0) {
                          setState({
                            newQuestsWindowIndex:
                              state.newQuestsWindowIndex - 1,
                          });
                        }
                      }}
                      style={{
                        textTransform: 'none',
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          color:
                            state.newQuestsWindowIndex <= 0
                              ? 'gray'
                              : undefined,
                        }}
                      >
                        Previous
                      </Typography>
                    </Button>
                    <Button
                      onClick={() => {
                        if (
                          state.newQuestsWindowIndex <
                          newQuests.length / 4 - 1
                        ) {
                          setState({
                            newQuestsWindowIndex:
                              state.newQuestsWindowIndex + 1,
                          });
                        }
                      }}
                      style={{
                        textTransform: 'none',
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          color:
                            state.newQuestsWindowIndex >=
                            newQuests.length / 4 - 1
                              ? 'gray'
                              : undefined,
                        }}
                      >
                        Next
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              )}
              {tabValue === 1 && completedQuests.length > 4 && (
                <Grid container className={classes.main}>
                  <Grid container justify="center" style={{ margin: '1rem' }}>
                    <Button
                      onClick={() => {
                        if (state.completedQuestsWindowIndex > 0) {
                          setState({
                            completedQuestsWindowIndex:
                              state.completedQuestsWindowIndex - 1,
                          });
                        }
                      }}
                      style={{
                        textTransform: 'none',
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          color:
                            state.completedQuestsWindowIndex <= 0
                              ? 'gray'
                              : undefined,
                        }}
                      >
                        Previous
                      </Typography>
                    </Button>
                    <Button
                      onClick={() => {
                        if (
                          state.completedQuestsWindowIndex <
                          completedQuests.length / 4 - 1
                        ) {
                          setState({
                            completedQuestsWindowIndex:
                              state.completedQuestsWindowIndex + 1,
                          });
                        }
                      }}
                      style={{
                        textTransform: 'none',
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          color:
                            state.completedQuestsWindowIndex >=
                            completedQuests.length / 4 - 1
                              ? 'gray'
                              : undefined,
                        }}
                      >
                        Next
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              )}
            </ul>
          </StudentBoard>
          <div className={classes.mascotContainer}>
            <div className={classes.mascotInnerContainer}>
              <div className={classes.mascotSpeech}>
                Knight, get ready to take on your quests!
              </div>
              <img
                src={mascotImage}
                alt="Mascot"
                className={classes.mascotImage}
              />
            </div>
          </div>
        </Grid>
      </div>
    </PageContainer>
  );
};

export default Quests;
