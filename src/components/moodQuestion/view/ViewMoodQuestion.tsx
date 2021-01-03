import React from 'react';
import { FormGroup, IconButton } from '@material-ui/core';
import {
  SentimentVerySatisfied,
  SentimentSatisfiedAlt,
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
} from '@material-ui/icons/';

import { AnswerData } from 'interfaces/models/answers';
import { Mood } from 'interfaces/models/questions';

import { useStyles } from './viewMoodQuestion.styles';

interface ViewMoodQuestionProps {
  answer?: AnswerData;
  answerBefore?: AnswerData;
  answerAfter?: AnswerData;
}

const ViewMoodQuestion: React.FunctionComponent<ViewMoodQuestionProps> = ({
  answer,
  answerBefore,
  answerAfter,
}) => {
  const classes = useStyles();

  const getEmojiClass = (
    mood: Mood,
    before?: string,
    after?: string
  ): string => {
    let result = classes.emoji;
    if ((before && before === mood) || (after && after === mood)) {
      result += ` ${classes.emojiSelected}`;
    }
    if (before && before === mood) {
      result += ' is-before';
    }
    if (after && after === mood) {
      result += ' is-after';
    }
    return result;
  };

  const renderQuestion = () => {
    if (answer) {
      const optionText = answer.option?.optionText;

      return (
        <div className={classes.top}>
          <div className={classes.emojiContainer}>
            <IconButton
              aria-label="Very Dissatisfied"
              disabled
              className={
                optionText === Mood.VERY_BAD
                  ? `${classes.emojiSelected} ${classes.emoji}`
                  : classes.emoji
              }
            >
              <SentimentVeryDissatisfied fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="Dissatisfied"
              disabled
              className={
                optionText === Mood.BAD
                  ? `${classes.emojiSelected} ${classes.emoji}`
                  : classes.emoji
              }
            >
              <SentimentDissatisfied fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="Neutral"
              disabled
              className={
                optionText === Mood.NORMAL
                  ? `${classes.emojiSelected} ${classes.emoji}`
                  : classes.emoji
              }
            >
              <SentimentSatisfied fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="Satisfied"
              disabled
              className={
                optionText === Mood.GOOD
                  ? `${classes.emojiSelected} ${classes.emoji}`
                  : classes.emoji
              }
            >
              <SentimentSatisfiedAlt fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="Very Satisfied"
              disabled
              className={
                optionText === Mood.VERY_GOOD
                  ? `${classes.emojiSelected} ${classes.emoji}`
                  : classes.emoji
              }
            >
              <SentimentVerySatisfied fontSize="large" />
            </IconButton>
          </div>
        </div>
      );
    }

    if (answerBefore !== undefined || answerAfter !== undefined) {
      const beforeText = answerBefore?.option?.optionText;
      const afterText = answerAfter?.option?.optionText;

      const veryBadClass = getEmojiClass(Mood.VERY_BAD, beforeText, afterText);
      const badClass = getEmojiClass(Mood.BAD, beforeText, afterText);
      const normalClass = getEmojiClass(Mood.NORMAL, beforeText, afterText);
      const goodClass = getEmojiClass(Mood.GOOD, beforeText, afterText);
      const veryGoodClass = getEmojiClass(
        Mood.VERY_GOOD,
        beforeText,
        afterText
      );

      return (
        <div className={classes.top}>
          <div className={classes.emojiContainer}>
            <IconButton
              aria-label="Very Dissatisfied"
              disabled
              className={veryBadClass}
            >
              <SentimentVeryDissatisfied fontSize="large" />
            </IconButton>
            <IconButton aria-label="Dissatisfied" disabled className={badClass}>
              <SentimentDissatisfied fontSize="large" />
            </IconButton>
            <IconButton aria-label="Neutral" disabled className={normalClass}>
              <SentimentSatisfied fontSize="large" />
            </IconButton>
            <IconButton aria-label="Satisfied" disabled className={goodClass}>
              <SentimentSatisfiedAlt fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="Very Satisfied"
              disabled
              className={veryGoodClass}
            >
              <SentimentVerySatisfied fontSize="large" />
            </IconButton>
          </div>
        </div>
      );
    }

    return <></>;
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default ViewMoodQuestion;
