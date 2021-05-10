import React from 'react';
import {
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';

import { AnswerData } from 'interfaces/models/answers';

import { useStyles } from './viewMcqQuestion.styles';

interface ViewMcqQuestionProps {
  answer?: AnswerData;
  answerBefore?: AnswerData;
  answerAfter?: AnswerData;
}

const ViewMcqQuestion: React.FunctionComponent<ViewMcqQuestionProps> = ({
  answer,
  answerBefore,
  answerAfter,
}) => {
  const classes = useStyles();

  const renderQuestion = () => {
    if (answer) {
      return (
        <div className={classes.top}>
          <RadioGroup>
            {answer.questionOrder.options
              .slice()
              .sort((a, b) => a.optionId - b.optionId)
              .map((option, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={`option-${answer.answerId}-${index}`}
                  className={
                    option.optionText === answer.option?.optionText
                      ? `${classes.option} ${classes.optionSelected}`
                      : classes.option
                  }
                >
                  <FormControlLabel
                    checked={option.optionText === answer.option?.optionText}
                    value={option.optionText}
                    style={{ width: '100%' }}
                    control={<Radio disableRipple disabled />}
                    label={option.optionText}
                  />
                </div>
              ))}
          </RadioGroup>
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
                  <RadioGroup style={{ width: '100%' }}>
                    {answerBefore.questionOrder.options
                      .slice()
                      .sort((a, b) => a.optionId - b.optionId)
                      .map((option, index) => (
                        <div
                          // eslint-disable-next-line react/no-array-index-key
                          key={`option-${answerBefore.answerId}-${index}`}
                          className={
                            option.optionText ===
                            answerBefore.option?.optionText
                              ? `${classes.option} ${classes.optionSelected}`
                              : classes.option
                          }
                        >
                          <FormControlLabel
                            checked={
                              option.optionText ===
                              answerBefore.option?.optionText
                            }
                            value={option.optionText}
                            style={{ width: '100%' }}
                            control={<Radio disableRipple disabled />}
                            label={option.optionText}
                          />
                        </div>
                      ))}
                  </RadioGroup>
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
                  <RadioGroup style={{ width: '100%' }}>
                    {answerAfter.questionOrder.options
                      .slice()
                      .sort((a, b) => a.optionId - b.optionId)
                      .map((option, index) => (
                        <div
                          // eslint-disable-next-line react/no-array-index-key
                          key={`option-${answerAfter.answerId}-${index}`}
                          className={
                            option.optionText === answerAfter.option?.optionText
                              ? `${classes.option} ${classes.optionSelected} is-right`
                              : classes.option
                          }
                        >
                          <FormControlLabel
                            checked={
                              option.optionText ===
                              answerAfter.option?.optionText
                            }
                            value={option.optionText}
                            control={<Radio disableRipple disabled />}
                            label={option.optionText}
                          />
                        </div>
                      ))}
                  </RadioGroup>
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

export default ViewMcqQuestion;
