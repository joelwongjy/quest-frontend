import React from 'react';
import { FormGroup, Grid, IconButton, Typography } from '@material-ui/core';
import {
  SentimentVerySatisfied,
  SentimentSatisfiedAlt,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
} from '@material-ui/icons/';

import { AnswerData } from 'interfaces/models/answers';
import { useStyles } from './viewMoodQuestion.styles';

interface ViewMoodQuestionProps {
  answer?: AnswerData;
  answerBefore?: AnswerData;
  answerAfter?: AnswerData;
}

const ViewMoodQuestion: React.FunctionComponent<ViewMoodQuestionProps> = ({
  answer,
  answerBefore,
  answerAfter,
}) => {
  const classes = useStyles();

  const renderQuestion = () => {
    if (answer) {
      return (
        <div className={classes.top}>
          <div className={classes.emojiContainer}>
            <IconButton aria-label="Very Dissatisfied">
              <SentimentVeryDissatisfied fontSize="large" />
            </IconButton>
            <IconButton aria-label="Sissatisfied">
              <SentimentDissatisfied fontSize="large" />
            </IconButton>
            <IconButton aria-label="Neutral">
              <SentimentSatisfied fontSize="large" />
            </IconButton>
            <IconButton aria-label="Satisfied">
              <SentimentSatisfiedAlt fontSize="large" />
            </IconButton>
            <IconButton aria-label="Very Satisfied">
              <SentimentVerySatisfied fontSize="large" />
            </IconButton>
          </div>
        </div>
      );
    }

    if (answerBefore !== undefined || answerAfter !== undefined) {
      return (
        <div className={classes.top}>
          <Grid container alignItems="center" justify="space-between">
            <Grid
              item
              xs={6}
              style={{ paddingLeft: '0.5rem', borderRight: '2px solid grey' }}
            >
              <Grid container justify="center">
                <Typography variant="h6" style={{ color: '#695F5F' }}>
                  Before
                </Typography>
              </Grid>
              {answerBefore !== undefined ? (
                <div className={classes.emojiContainer}>
                  <IconButton aria-label="Very Dissatisfied">
                    <SentimentVeryDissatisfied fontSize="large" />
                  </IconButton>
                  <IconButton aria-label="Sissatisfied">
                    <SentimentDissatisfied fontSize="large" />
                  </IconButton>
                  <IconButton aria-label="Neutral">
                    <SentimentSatisfied fontSize="large" />
                  </IconButton>
                  <IconButton aria-label="Satisfied">
                    <SentimentSatisfiedAlt fontSize="large" />
                  </IconButton>
                  <IconButton aria-label="Very Satisfied">
                    <SentimentVerySatisfied fontSize="large" />
                  </IconButton>
                </div>
              ) : (
                <Typography
                  style={{ paddingTop: '1rem', paddingRight: '1rem' }}
                >
                  This question was added after the student attempted the
                  pre-programme questionnaire.
                </Typography>
              )}
            </Grid>
            <Grid
              item
              xs={6}
              style={{ paddingLeft: '0.5rem', borderRight: '2px solid grey' }}
            >
              <Grid container justify="center">
                <Typography variant="h6" style={{ color: '#695F5F' }}>
                  Before
                </Typography>
              </Grid>
              {answerAfter !== undefined ? (
                <div className={classes.emojiContainer}>
                  <IconButton aria-label="Very Dissatisfied">
                    <SentimentVeryDissatisfied fontSize="large" />
                  </IconButton>
                  <IconButton aria-label="Sissatisfied">
                    <SentimentDissatisfied fontSize="large" />
                  </IconButton>
                  <IconButton aria-label="Neutral">
                    <SentimentSatisfied fontSize="large" />
                  </IconButton>
                  <IconButton aria-label="Satisfied">
                    <SentimentSatisfiedAlt fontSize="large" />
                  </IconButton>
                  <IconButton aria-label="Very Satisfied">
                    <SentimentVerySatisfied fontSize="large" />
                  </IconButton>
                </div>
              ) : (
                <Typography
                  style={{ paddingTop: '1rem', paddingRight: '1rem' }}
                >
                  This question has been modified or deleted after the student
                  attempted the pre-programme questionnaire
                </Typography>
              )}
            </Grid>
          </Grid>
        </div>
      );
    }

    return <></>;
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default ViewMoodQuestion;
