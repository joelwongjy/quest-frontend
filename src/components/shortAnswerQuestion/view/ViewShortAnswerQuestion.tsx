import React from 'react';
import { FormGroup, Grid, Typography } from '@material-ui/core';

import QuestTextField from 'componentWrappers/questTextField';

import { AnswerData } from 'interfaces/models/answers';
import { useStyles } from './viewShortAnswerQuestion.styles';

interface ViewShortAnswerQuestionProps {
  answer?: AnswerData;
  answerBefore?: AnswerData;
  answerAfter?: AnswerData;
}

const ViewShortAnswerQuestion: React.FunctionComponent<ViewShortAnswerQuestionProps> = ({
  answer,
  answerBefore,
  answerAfter,
}) => {
  const classes = useStyles();

  const renderQuestion = () => {
    if (answer) {
      return (
        <div className={`${classes.top} is-single`}>
          <QuestTextField
            disabled
            label="Answer"
            value={answer.textResponse}
            className={classes.textfield}
          />
        </div>
      );
    }

    if (answerBefore !== undefined || answerAfter !== undefined) {
      return (
        <div className={classes.top}>
          <Grid container justify="space-between">
            <Grid item xs={12} md={6} className={classes.leftAnswer}>
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                <Typography variant="h6" className={classes.beforeAfter}>
                  Before
                </Typography>

                {answerBefore !== undefined ? (
                  <QuestTextField
                    disabled
                    defaultValue="Long Answer"
                    value={answerBefore.textResponse}
                    className={classes.textfield}
                  />
                ) : (
                  <div className={classes.noOptionContainer}>
                    <Typography className={classes.noOption}>
                      This question was added after the student attempted the
                      pre-programme questionnaire.
                    </Typography>
                  </div>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} className={classes.rightAnswer}>
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                <Typography variant="h6" className={classes.beforeAfter}>
                  After
                </Typography>

                {answerAfter !== undefined ? (
                  <QuestTextField
                    disabled
                    defaultValue="Long Answer"
                    value={answerAfter.textResponse}
                    className={`${classes.textfield} is-right`}
                  />
                ) : (
                  <div className={classes.noOptionContainer}>
                    <Typography className={classes.noOption}>
                      This question has been modified or deleted after the
                      student attempted the pre-programme questionnaire.
                    </Typography>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }

    return <></>;
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default ViewShortAnswerQuestion;
