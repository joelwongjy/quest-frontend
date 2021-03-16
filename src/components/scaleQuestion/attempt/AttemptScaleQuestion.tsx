import React, { useEffect } from 'react';

import QuestSlider from 'componentWrappers/questSlider';
import { AnswerPostData } from 'interfaces/models/answers';
import { QuestionData, Scale } from 'interfaces/models/questions';
import sliderThumbImage from 'assets/images/student/slider-circle.png';
import { useError } from 'contexts/ErrorContext';

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
  const { hasError } = useError();

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

  const thumbComponent = (props: unknown) => {
    return (
      <span {...props}>
        <img
          src={sliderThumbImage}
          alt="Slider Thumb"
          className={classes.thumb}
        />
      </span>
    );
  };

  const showWarning = hasError && answer?.optionId === undefined;

  return (
    <div className={classes.top}>
      <div className={classes.textfieldContainer}>
        <div className={classes.questionText}>{question.questionText}</div>
      </div>
      <div className={classes.scaleContainer}>
        <QuestSlider
          defaultValue={3}
          aria-labelledby="discrete-slider"
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
          ThumbComponent={thumbComponent}
          track={false}
        />
        <div className={classes.valueContainer}>
          <div>I hate it</div>
          <div>I don&apos;t like it</div>
          <div>I don&apos;t know</div>
          <div>I like it</div>
          <div>I love it</div>
        </div>
      </div>
      {showWarning && (
        <div className={classes.warning}>
          Please use the slider to select an option above!
        </div>
      )}
    </div>
  );
};

export default AttemptScaleQuestion;
