import React from 'react';
import { FormControl, FormGroup, Grid } from '@material-ui/core';

import QuestTextField from 'componentWrappers/questTextField';

import { AnswerData } from 'interfaces/models/answers';
import QuestSlider from 'componentWrappers/questSlider';
import { useStyles } from './viewScaleQuestion.styles';

interface ViewScaleQuestionProps {
  answer: AnswerData;
}

const ViewScaleQuestion: React.FunctionComponent<ViewScaleQuestionProps> = ({
  answer,
}) => {
  const classes = useStyles();

  const renderQuestion = () => {
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
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default ViewScaleQuestion;
