import React from 'react';
import { useDispatch } from 'react-redux';

import { QuestionMode, QuestionOrder } from 'interfaces/models/questionnaires';

import {
  addQuestionToPre,
  addQuestionToPost,
  deleteQuestionInPre,
  updateQuestionInPre,
} from 'reducers/questionnaireDux';
import { Card } from '@material-ui/core';
import QuestionCard from 'components/questionCard';
import { useStyles } from './editAccordion.styles';

interface UniqueEditProps {
  preQuestionSet: QuestionOrder[];
  postQuestionSet: QuestionOrder[];
}

const UniqueEdit: React.FunctionComponent<UniqueEditProps> = ({
  preQuestionSet,
  postQuestionSet,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      {preQuestionSet.map((q) => {
        const { order, ...question } = q;
        return (
          <QuestionCard
            key={`question-${order}-${question.id}`}
            question={q}
            mode={QuestionMode.EDIT}
            handleDelete={() => dispatch(deleteQuestionInPre(order))}
            updateQuestion={(newQuestion: QuestionOrder) =>
              dispatch(updateQuestionInPre(newQuestion))
            }
            className={classes.card}
          />
        );
      })}
      <Card
        className={classes.addCard}
        onClick={() => dispatch(addQuestionToPre())}
      >
        Add a question
      </Card>
    </div>
  );
};

export default UniqueEdit;
