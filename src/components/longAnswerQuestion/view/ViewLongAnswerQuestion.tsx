import React from 'react';
import { FormControl, FormGroup } from '@material-ui/core';

import QuestTextField from 'componentWrappers/questTextField';
import { AnswerData } from 'interfaces/models/answers';
import { useStyles } from './viewLongAnswerQuestion.styles';

interface ViewLongAnswerQuestionProps {
  answer: AnswerData;
}

const ViewLongAnswerQuestion: React.FunctionComponent<ViewLongAnswerQuestionProps> = ({
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
        <QuestTextField
          placeholder="Long Answer"
          label="Answer"
          value={answer.textResponse}
          multiline
          rows={4}
          InputProps={{
            readOnly: true,
          }}
          style={{ marginTop: '1rem' }}
        />
      </div>
    );
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default ViewLongAnswerQuestion;
