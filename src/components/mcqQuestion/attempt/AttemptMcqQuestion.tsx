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
      <RadioGroup>
        {question.options.map((option) => (
          <div
            key={`option-${option.optionId}-${question.qnOrderId}`}
            style={{ width: '100%', display: 'flex', alignItems: 'center' }}
          >
            <FormControlLabel
              checked={answer && option.optionId === answer?.optionId}
              value={option.optionText}
              style={{ width: '100%' }}
              control={<Radio />}
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
