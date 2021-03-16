import React from 'react';

import QuestTextField from 'componentWrappers/questTextField';
import { AnswerPostData } from 'interfaces/models/answers';
import { QuestionData } from 'interfaces/models/questions';
import { useStyles } from './attemptShortAnswerQuestion.styles';

interface AttemptShortAnswerQuestionProps {
  question: QuestionData;
  answerCallback: (answer: AnswerPostData) => void;
  answer?: AnswerPostData;
}

const AttemptShortAnswerQuestion: React.FC<AttemptShortAnswerQuestionProps> = ({
  question,
  answerCallback,
  answer,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.top}>
      <div className={classes.textfieldContainer}>
        <div className={classes.questionText}>{question.questionText}</div>
      </div>
      <QuestTextField
        placeholder="Short Answer"
        label=""
        value={answer?.textResponse ?? ''}
        onChange={(event) => {
          answerCallback({
            questionOrderId: question.qnOrderId,
            textResponse: event.target.value,
          });
        }}
        className={classes.textfield}
      />
    </div>
  );
};

export default AttemptShortAnswerQuestion;
