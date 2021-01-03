import React from 'react';
import { FormGroup, Grid } from '@material-ui/core';

import { AnswerData } from 'interfaces/models/answers';
import QuestSlider from 'componentWrappers/questSlider';
import { Scale } from 'interfaces/models/questions';

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

  const scaleToNumberMap: { [key: string]: number } = {
    [Scale.ONE]: 1,
    [Scale.TWO]: 2,
    [Scale.THREE]: 3,
    [Scale.FOUR]: 4,
    [Scale.FIVE]: 5,
  };

  const renderQuestion = () => {
    if (answer) {
      const value = scaleToNumberMap[answer.option!.optionText!];
      const answerClass = `is-blue-${value}`;
      return (
        <div className={classes.top}>
          <QuestSlider
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={1}
            marks
            min={1}
            max={5}
            value={value}
            className={`${classes.scale} ${answerClass}`}
          />
        </div>
      );
    }

    if (answerBefore !== undefined || answerAfter !== undefined) {
      const values = [];
      let beforeValue = 0;
      let afterValue = 0;
      let answerClass = '';

      if (answerBefore) {
        beforeValue = scaleToNumberMap[answerBefore.option!.optionText!];
        values.push(beforeValue);
        answerClass += `is-blue-${beforeValue} has-before`;
      }

      if (answerAfter) {
        afterValue = scaleToNumberMap[answerAfter.option!.optionText!];
        if (afterValue !== beforeValue) {
          values.push(afterValue);
        }
        answerClass += ` is-red-${afterValue} has-after`;
      }

      return (
        <div className={classes.top}>
          <QuestSlider
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={1}
            marks
            min={1}
            max={5}
            value={values}
            className={`${classes.scale} ${answerClass}`}
          />
        </div>
      );
    }

    return <></>;
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default ViewScaleQuestion;
