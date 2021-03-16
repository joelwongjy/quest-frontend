import React from 'react';
import { IconButton } from '@material-ui/core';

import { AnswerPostData } from 'interfaces/models/answers';
import { QuestionData, Mood } from 'interfaces/models/questions';
import verySadImage from 'assets/images/student/very-sad.png';
import sadImage from 'assets/images/student/sad.png';
import neutralImage from 'assets/images/student/neutral.png';
import happyImage from 'assets/images/student/happy.png';
import veryHappyImage from 'assets/images/student/very-happy.png';

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
    [mood: string]: string;
  } = {
    [Mood.VERY_BAD]: verySadImage,
    [Mood.BAD]: sadImage,
    [Mood.NORMAL]: neutralImage,
    [Mood.GOOD]: happyImage,
    [Mood.VERY_GOOD]: veryHappyImage,
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
          const imageSrc = moods[m];
          return (
            <IconButton
              key={`${question.qnOrderId}-${m}`}
              aria-label={m}
              onClick={() => handleClick(m as Mood)}
              className={classes.button}
            >
              <img
                src={imageSrc}
                alt="m"
                className={`${classes.image} ${
                  optionToIdMap[m] === answer?.optionId ? 'is-selected' : ''
                }`}
              />
            </IconButton>
          );
        })}
      </div>
    </div>
  );
};

export default AttemptMoodQuestion;
