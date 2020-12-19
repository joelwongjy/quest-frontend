import React from 'react';
import {
  FormGroup,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  Typography,
} from '@material-ui/core';

import QuestTextField from 'componentWrappers/questTextField';

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
          <div className={classes.textfieldContainer}>
            <FormControl style={{ width: '100%' }}>
              <QuestTextField
                className={classes.textfield}
                label="Question"
                value={answer.questionOrder.questionText}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </div>
          <RadioGroup>
            {answer.questionOrder.options.map((option, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`option-${answer.answerId}-${index}`}
                style={{ width: '100%', display: 'flex', alignItems: 'center' }}
              >
                <FormControlLabel
                  checked={option.optionText === answer.option?.optionText}
                  value={option.optionText}
                  style={{ width: '100%' }}
                  control={<Radio />}
                  label={option.optionText}
                />
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    }
    if (answerBefore !== undefined && answerAfter !== undefined) {
      if (
        answerBefore.questionOrder.questionText ===
        answerAfter.questionOrder.questionText
      ) {
        return (
          <div className={classes.top}>
            <div className={classes.textfieldContainer}>
              <FormControl style={{ width: '100%' }}>
                <QuestTextField
                  className={classes.textfield}
                  label="Question"
                  value={answerBefore.questionOrder.questionText}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            </div>
            <Grid container justify="space-between">
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
                <RadioGroup>
                  {answerBefore.questionOrder.options.map((option, index) => (
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={`option-${answerBefore.answerId}-${index}`}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <FormControlLabel
                        checked={
                          option.optionText === answerBefore.option?.optionText
                        }
                        value={option.optionText}
                        style={{ width: '100%' }}
                        control={<Radio />}
                        label={option.optionText}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </Grid>
              <Grid item xs={6} style={{ paddingLeft: '1.5rem' }}>
                <Grid container justify="center">
                  <Typography variant="h6" style={{ color: '#695F5F' }}>
                    After
                  </Typography>
                </Grid>
                <RadioGroup>
                  {answerAfter.questionOrder.options.map((option, index) => (
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={`option-${answerAfter.answerId}-${index}`}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <FormControlLabel
                        checked={
                          option.optionText === answerAfter.option?.optionText
                        }
                        value={option.optionText}
                        style={{ width: '100%' }}
                        control={<Radio />}
                        label={option.optionText}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </Grid>
            </Grid>
          </div>
        );
      }
    } else if (answerBefore !== undefined) {
      return (
        <div className={classes.top}>
          <div className={classes.textfieldContainer}>
            <FormControl style={{ width: '100%' }}>
              <QuestTextField
                className={classes.textfield}
                label="Question"
                value={answerBefore.questionOrder.questionText}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </div>
          <Grid container justify="space-between">
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
              <RadioGroup>
                {answerBefore.questionOrder.options.map((option, index) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`option-${answerBefore.answerId}-${index}`}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FormControlLabel
                      checked={
                        option.optionText === answerBefore.option?.optionText
                      }
                      value={option.optionText}
                      style={{ width: '100%' }}
                      control={<Radio />}
                      label={option.optionText}
                    />
                  </div>
                ))}
              </RadioGroup>
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: '1.5rem' }}>
              <Grid container justify="center">
                <Typography variant="h6" style={{ color: '#695F5F' }}>
                  After
                </Typography>
              </Grid>
              <Typography>
                This question has been modified or deleted after the student
                attempted the pre-programme questionnaire.
              </Typography>
            </Grid>
          </Grid>
        </div>
      );
    } else if (answerAfter !== undefined) {
      return (
        <div className={classes.top}>
          <div className={classes.textfieldContainer}>
            <FormControl style={{ width: '100%' }}>
              <QuestTextField
                className={classes.textfield}
                label="Question"
                value={answerAfter.questionOrder.questionText}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </div>
          <Grid container justify="space-between">
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
              <Typography>
                This question was added after the student attempted the
                pre-programme questionnaire.
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: '1.5rem' }}>
              <Grid container justify="center">
                <Typography variant="h6" style={{ color: '#695F5F' }}>
                  After
                </Typography>
              </Grid>
              <RadioGroup>
                {answerAfter.questionOrder.options.map((option, index) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`option-${answerAfter.answerId}-${index}`}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <FormControlLabel
                      checked={
                        option.optionText === answerAfter.option?.optionText
                      }
                      value={option.optionText}
                      style={{ width: '100%' }}
                      control={<Radio />}
                      label={option.optionText}
                    />
                  </div>
                ))}
              </RadioGroup>
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
