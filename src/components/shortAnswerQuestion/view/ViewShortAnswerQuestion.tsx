import React from 'react';
import { FormControl, FormGroup } from '@material-ui/core';

import QuestTextField from 'componentWrappers/questTextField';

import { AnswerData } from 'interfaces/models/answers';
import { useStyles } from './viewShortAnswerQuestion.styles';

interface ViewShortAnswerQuestionProps {
  answer?: AnswerData;
  answerBefore?: AnswerData;
  answerAfter?: AnswerData;
}

const ViewShortAnswerQuestion: React.FunctionComponent<ViewShortAnswerQuestionProps> = ({
  answer,
  answerBefore,
  answerAfter,
}) => {
  const classes = useStyles();

  const renderQuestion = () => {
    if (answer) {
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
            InputProps={{
              readOnly: true,
            }}
            style={{ marginTop: '1rem' }}
          />
        </div>
      );
    }
    return <></>;
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default ViewShortAnswerQuestion;
