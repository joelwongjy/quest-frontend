import React from 'react';
import { FormControl, FormGroup, Grid, Typography } from '@material-ui/core';

import QuestTextField from 'componentWrappers/questTextField';
import { AnswerData } from 'interfaces/models/answers';
import { useStyles } from './viewLongAnswerQuestion.styles';

interface ViewLongAnswerQuestionProps {
  answer?: AnswerData;
  answerBefore?: AnswerData;
  answerAfter?: AnswerData;
}

const ViewLongAnswerQuestion: React.FunctionComponent<ViewLongAnswerQuestionProps> = ({
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
          <QuestTextField
            placeholder="Long Answer"
            label="Answer"
            value={answer.textResponse}
            multiline
            rows={4}
            InputProps={{
              readOnly: true,
            }}
            style={{ marginTop: '1rem' }}
          />
        </div>
      );
    }
    if (answerBefore !== undefined && answerAfter !== undefined) {
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
              style={{
                paddingLeft: '0.5rem',
                paddingRight: '1.5rem',
                borderRight: '2px solid grey',
              }}
            >
              <Grid container justify="center">
                <Typography variant="h6" style={{ color: '#695F5F' }}>
                  Before
                </Typography>
              </Grid>
              <QuestTextField
                disabled
                defaultValue="Long Answer"
                value={answerBefore.textResponse}
                rows={3}
                multiline
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{ paddingLeft: '1.5rem', paddingRight: '0.5rem' }}
            >
              <Grid container justify="center">
                <Typography variant="h6" style={{ color: '#695F5F' }}>
                  After
                </Typography>
              </Grid>
              <QuestTextField
                disabled
                defaultValue="Long Answer"
                value={answerAfter.textResponse}
                rows={3}
                multiline
              />
            </Grid>
          </Grid>
        </div>
      );
    }
    if (answerBefore !== undefined) {
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
              style={{
                paddingLeft: '0.5rem',
                paddingRight: '1.5rem',
                borderRight: '2px solid grey',
              }}
            >
              <Grid container justify="center">
                <Typography variant="h6" style={{ color: '#695F5F' }}>
                  Before
                </Typography>
              </Grid>
              <QuestTextField
                disabled
                defaultValue="Long Answer"
                value={answerBefore.textResponse}
                rows={3}
                multiline
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{ paddingLeft: '1.5rem', paddingRight: '0.5rem' }}
            >
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
    }
    if (answerAfter !== undefined) {
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
              style={{
                paddingLeft: '0.5rem',
                paddingRight: '1.5rem',
                borderRight: '2px solid grey',
              }}
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
            <Grid
              item
              xs={6}
              style={{ paddingLeft: '1.5rem', paddingRight: '0.5rem' }}
            >
              <Grid container justify="center">
                <Typography variant="h6" style={{ color: '#695F5F' }}>
                  After
                </Typography>
              </Grid>
              <QuestTextField
                disabled
                defaultValue="Long Answer"
                value={answerAfter.textResponse}
                rows={3}
                multiline
              />
            </Grid>
          </Grid>
        </div>
      );
    }
    return <></>;
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default ViewLongAnswerQuestion;
