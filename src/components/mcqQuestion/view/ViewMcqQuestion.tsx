import React from 'react';
import {
  FormGroup,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';

import QuestTextField from 'componentWrappers/questTextField';

import { AnswerData } from 'interfaces/models/answers';
import { useStyles } from './viewMcqQuestion.styles';

interface ViewMcqQuestionProps {
  answer: AnswerData;
}

const ViewMcqQuestion: React.FunctionComponent<ViewMcqQuestionProps> = ({
  answer,
}) => {
  const classes = useStyles();

  const renderQuestion = () => {
    return (
      <div className={classes.top}>
        <div className={classes.textfieldContainer}>
          <FormControl style={{ width: '100%' }}>
            <QuestTextField
              className={classes.textfield}
              label="Question"
              value={answer.questionOrder.questionText}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
        </div>
        <RadioGroup>
          {answer.questionOrder.options.map((option, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`option-${answer.answerId}-${index}`}
              style={{ width: '100%', display: 'flex', alignItems: 'center' }}
            >
              <FormControlLabel
                checked={option.optionText === answer.option?.optionText}
                value={option.optionText}
                style={{ width: '100%' }}
                control={<Radio />}
                label={option.optionText}
              />
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default ViewMcqQuestion;
