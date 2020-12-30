import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import QuestSlider from 'componentWrappers/questSlider';
import { AnswerPostData } from 'interfaces/models/answers';
import { QuestionData, Scale } from 'interfaces/models/questions';

import { useStyles } from './attemptScaleQuestion.styles';

interface AttemptScaleQuestionProps {
  question: QuestionData;
  answerCallback: (answer: AnswerPostData) => void;
  answer?: AnswerPostData;
}

const AttemptScaleQuestion: React.FC<AttemptScaleQuestionProps> = ({
  question,
  answerCallback,
  answer,
}) => {
  useEffect(() => {
    if (!answer || !answer?.optionId) {
      answerCallback({
        questionOrderId: question.qnOrderId,
        optionId: question.options.find((o) => o.optionText === Scale.THREE)
          ?.optionId,
      });
    }
  }, []);

  const classes = useStyles();

  const scaleToNumberMap: { [key: string]: number } = {
    [Scale.ONE]: 1,
    [Scale.TWO]: 2,
    [Scale.THREE]: 3,
    [Scale.FOUR]: 4,
    [Scale.FIVE]: 5,
  };

  const optionIdToNumberMap: {
    [key: number]: number;
  } = question.options.reduce((obj, o) => {
    // eslint-disable-next-line no-param-reassign
    obj[o.optionId] = scaleToNumberMap[o.optionText];
    return obj;
  }, {} as { [key: number]: number });

  const numberToScaleMap: { [key: number]: string } = {
    1: Scale.ONE,
    2: Scale.TWO,
    3: Scale.THREE,
    4: Scale.FOUR,
    5: Scale.FIVE,
  };

  const handleSliderChange = (
    // eslint-disable-next-line @typescript-eslint/ban-types
    _event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    answerCallback({
      questionOrderId: question.qnOrderId,
      optionId: question.options.find(
        (o) => o.optionText === numberToScaleMap[newValue as number]
      )?.optionId,
    });
  };

  return (
    <div className={classes.top}>
      <div className={classes.textfieldContainer}>
        <div className={classes.questionText}>{question.questionText}</div>
      </div>
      <Grid container alignItems="center" justify="space-around">
        <QuestSlider
          defaultValue={3}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={1}
          marks
          min={1}
          max={5}
          value={
            answer && answer.optionId
              ? optionIdToNumberMap[answer.optionId]
              : undefined
          }
          className={classes.scale}
          onChange={handleSliderChange}
        />
      </Grid>
    </div>
  );
};

export default AttemptScaleQuestion;
