import React from 'react';
import { FormGroup, Grid, Typography } from '@material-ui/core';

import { AnswerData } from 'interfaces/models/answers';
import QuestSlider from 'componentWrappers/questSlider';
import { useStyles } from './viewScaleQuestion.styles';

interface ViewScaleQuestionProps {
  answer?: AnswerData;
  answerBefore?: AnswerData;
  answerAfter?: AnswerData;
}

const ViewScaleQuestion: React.FunctionComponent<ViewScaleQuestionProps> = ({
  answer,
  answerBefore,
  answerAfter,
}) => {
  const classes = useStyles();

  const renderQuestion = () => {
    if (answer) {
      return (
        <div className={classes.top}>
          <Grid container alignItems="center" justify="space-around">
            <QuestSlider
              aria-labelledby="discrete-slider"
              valueLabelDisplay="on"
              step={1}
              marks
              min={1}
              max={5}
              value={3}
              className={classes.scale}
            />
          </Grid>
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
                <QuestSlider
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="on"
                  step={1}
                  marks
                  min={1}
                  max={5}
                  value={3}
                  className={classes.scale}
                />
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
                  After
                </Typography>
              </Grid>
              {answerAfter !== undefined ? (
                <QuestSlider
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="on"
                  step={1}
                  marks
                  min={1}
                  max={5}
                  value={3}
                  className={classes.scale}
                />
              ) : (
                <Typography
                  style={{ paddingTop: '1rem', paddingRight: '1rem' }}
                >
                  This question has been modified or deleted after the student
                  attempted the pre-programme questionnaire.
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

export default ViewScaleQuestion;
