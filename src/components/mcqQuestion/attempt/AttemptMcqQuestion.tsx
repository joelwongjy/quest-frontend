import React from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

import { AnswerPostData } from 'interfaces/models/answers';
import { QuestionData } from 'interfaces/models/questions';
import { useStyles } from './attemptMcqQuestion.styles';

interface AttemptMcqQuestionProps {
  question: QuestionData;
  answerCallback: (answer: AnswerPostData) => void;
  answer?: AnswerPostData;
}

const AttemptMcqQuestion: React.FC<AttemptMcqQuestionProps> = ({
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
      <RadioGroup className={classes.options}>
        {question.options.map((option) => (
          <div
            className={classes.option}
            key={`option-${option.optionId}-${question.qnOrderId}`}
          >
            <FormControlLabel
              checked={answer && option.optionId === answer?.optionId}
              value={option.optionText}
              style={{ width: '100%' }}
              control={<Radio className={classes.radio} size="medium" />}
              label={option.optionText}
              onClick={() => {
                answerCallback({
                  questionOrderId: question.qnOrderId,
                  optionId: option.optionId,
                });
              }}
            />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default AttemptMcqQuestion;
