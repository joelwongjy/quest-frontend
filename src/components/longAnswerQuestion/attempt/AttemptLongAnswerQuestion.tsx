import React from 'react';

import QuestTextField from 'componentWrappers/questTextField';
import { AnswerPostData } from 'interfaces/models/answers';
import { QuestionData } from 'interfaces/models/questions';
import { useError } from 'contexts/ErrorContext';
import { useStyles } from './attemptLongAnswerQuestion.styles';

interface AttemptLongAnswerQuestionProps {
  question: QuestionData;
  answerCallback: (answer: AnswerPostData) => void;
  answer?: AnswerPostData;
}

const AttemptLongAnswerQuestion: React.FC<AttemptLongAnswerQuestionProps> = ({
  question,
  answerCallback,
  answer,
}) => {
  const classes = useStyles();
  const { hasError } = useError();
  const showWarning =
    hasError &&
    (answer?.textResponse === undefined || answer.textResponse.length === 0);

  return (
    <div className={classes.top}>
      <div className={classes.textfieldContainer}>
        <div className={classes.questionText}>{question.questionText}</div>
      </div>
      <QuestTextField
        placeholder="Long Answer"
        label=""
        value={answer?.textResponse ?? ''}
        multiline
        rows={3}
        onChange={(event) => {
          answerCallback({
            questionOrderId: question.qnOrderId,
            textResponse: event.target.value,
          });
        }}
        className={classes.textfield}
      />
      {showWarning && (
        <div className={classes.warning}>Please fill in the textbox above!</div>
      )}
    </div>
  );
};

export default AttemptLongAnswerQuestion;
