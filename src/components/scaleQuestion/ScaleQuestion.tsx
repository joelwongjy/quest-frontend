import React, { useState } from 'react';
import {
  FormGroup,
  FormLabel,
  Grid,
  Slider,
  TextField,
} from '@material-ui/core';

import { QuestionOrder, QuestionMode } from 'interfaces/models/questionnaires';

import { useStyles } from './ScaleQuestion.styles';

interface ScaleQuestionProps {
  question: QuestionOrder;
  mode: QuestionMode;
  updateQuestion: (newQuestion: QuestionOrder) => void;
  dropdown: React.ReactNode;
}

const ScaleQuestion: React.FunctionComponent<ScaleQuestionProps> = ({
  question,
  mode,
  updateQuestion,
  dropdown,
}) => {
  const classes = useStyles();

  const [scale, setScale] = useState<number>();

  const handleSliderChange = (
    // eslint-disable-next-line @typescript-eslint/ban-types
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    setScale(newValue as number);
  };

  const updateText = (newText: string) => {
    const newQuestion = { ...question, questionText: newText };
    updateQuestion(newQuestion);
  };

  const renderQuestion = () => {
    switch (mode) {
      case QuestionMode.EDIT || QuestionMode.NEW:
        return (
          <div className={classes.top}>
            <div className={classes.textfieldContainer}>
              <TextField
                required
                className={classes.textfield}
                label="Question"
                variant="filled"
                value={question.questionText}
                onChange={(e) => updateText(e.target.value)}
              />
              {dropdown}
            </div>
            <Grid container alignItems="center" justify="space-around">
              <Slider
                defaultValue={3}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
                value={scale}
                className={classes.scale}
                onChange={handleSliderChange}
              />
            </Grid>
          </div>
        );
      default:
        return (
          <div className={classes.top}>
            <FormLabel component="legend">{question}</FormLabel>
          </div>
        );
    }
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default ScaleQuestion;
