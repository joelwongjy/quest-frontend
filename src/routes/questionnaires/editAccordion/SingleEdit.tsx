import React from 'react';
import { useDispatch } from 'react-redux';

import { Card } from '@material-ui/core';
import QuestionCard from 'components/questionCard';
import {
  QuestionAccessibility,
  QuestionMode,
  QuestionOrder,
} from 'interfaces/models/questionnaires';
import {
  addQuestionToShared,
  deleteQuestionInShared,
  transferQuestionToShared,
  updateQuestionInShared,
} from 'reducers/questionnaireDux';

import { useStyles } from './editAccordion.styles';

interface SingleEditProps {
  questionSet: QuestionOrder[];
}

const SingleEdit: React.FunctionComponent<SingleEditProps> = ({
  questionSet,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      {questionSet.map((q) => {
        const { order, ...question } = q;
        return (
          <QuestionCard
            key={`question-${order}-${question.id}`}
            question={q}
            mode={QuestionMode.EDIT}
            handleDelete={() => dispatch(deleteQuestionInShared(order))}
            handleDuplicate={() => dispatch(transferQuestionToShared(q))}
            updateQuestion={(newQuestion: QuestionOrder) =>
              dispatch(updateQuestionInShared(newQuestion))
            }
            accessibility={QuestionAccessibility.SHARED}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            updateAccessibility={() => {}}
            accessibilityEnabled={false}
            className={classes.card}
          />
        );
      })}
      <Card
        className={classes.addCard}
        onClick={() => dispatch(addQuestionToShared())}
      >
        Add a question
      </Card>
    </div>
  );
};

export default SingleEdit;
