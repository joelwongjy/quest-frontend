import React from 'react';
import { IconButton, SvgIconTypeMap } from '@material-ui/core';
import {
  SentimentDissatisfied,
  SentimentSatisfied,
  SentimentSatisfiedAlt,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
} from '@material-ui/icons';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

import { AnswerPostData } from 'interfaces/models/answers';
import { QuestionData, Mood } from 'interfaces/models/questions';

import { useStyles } from './attemptMoodQuestion.styles';

interface AttemptMoodQuestionProps {
  question: QuestionData;
  answerCallback: (answer: AnswerPostData) => void;
  answer?: AnswerPostData;
}

const AttemptMoodQuestion: React.FC<AttemptMoodQuestionProps> = ({
  question,
  answerCallback,
  answer,
}) => {
  const classes = useStyles();

  const optionToIdMap = question.options.reduce((obj, o) => {
    // eslint-disable-next-line no-param-reassign
    obj[o.optionText] = o.optionId;
    return obj;
  }, {} as { [o: string]: number });

  const moods: {
    [mood: string]: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
  } = {
    [Mood.VERY_BAD]: SentimentVeryDissatisfied,
    [Mood.BAD]: SentimentDissatisfied,
    [Mood.NORMAL]: SentimentSatisfied,
    [Mood.GOOD]: SentimentSatisfiedAlt,
    [Mood.VERY_GOOD]: SentimentVerySatisfied,
  };

  const handleClick = (mood: Mood) => {
    answerCallback({
      questionOrderId: question.qnOrderId,
      optionId: optionToIdMap[mood],
    });
  };

  return (
    <div className={classes.top}>
      <div className={classes.textfieldContainer}>
        <div className={classes.questionText}>{question.questionText}</div>
      </div>
      <div className={classes.emojiContainer}>
        {Object.keys(moods).map((m) => {
          const Icon = moods[m];
          return (
            <IconButton
              key={`${question.qnOrderId}-${m}`}
              aria-label="Very Dissatisfied"
              color={
                optionToIdMap[m] === answer?.optionId ? 'primary' : undefined
              }
              onClick={() => handleClick(m as Mood)}
            >
              <Icon fontSize="large" />
            </IconButton>
          );
        })}
      </div>
    </div>
  );
};

export default AttemptMoodQuestion;
