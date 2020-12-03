import React, { useState } from 'react';
import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
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

  const selectScale = (index: number) => {
    setScale(index);
  };

  const updateText = (newText: string) => {
    const newQuestion = { ...question, questionText: newText };
    updateQuestion(newQuestion);
  };

  const renderScale = (scaleSize: number) => {
    const radios = [];
    for (let i = 0; i < scaleSize; i += 1) {
      radios.push(
        <FormControlLabel
          value="top"
          control={
            <Radio
              checked={scale === i}
              value={i}
              onClick={() => selectScale(i)}
            />
          }
          label={i}
          labelPlacement="top"
        />
      );
    }
    return radios;
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
            <div className={classes.scale}>
              <RadioGroup row aria-label="scale" name="scale">
                {renderScale(10)}
              </RadioGroup>
            </div>
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
