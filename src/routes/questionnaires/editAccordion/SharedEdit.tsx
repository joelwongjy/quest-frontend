import React from 'react';
import { useDispatch } from 'react-redux';

import {
  QuestionAccessibility,
  QuestionMode,
  QuestionOrder,
} from 'interfaces/models/questionnaires';

import {
  addQuestionToShared,
  deleteQuestionInShared,
  transferQuestionToPost,
  transferQuestionToPre,
  transferQuestionToShared,
  updateQuestionInShared,
} from 'reducers/questionnaireDux';
import { Card } from '@material-ui/core';
import QuestionCard from 'components/questionCard';
import { useStyles } from './editAccordion.styles';

interface SharedEditProps {
  questionSet: QuestionOrder[];
}

const SharedEdit: React.FunctionComponent<SharedEditProps> = ({
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
            updateAccessibility={(accessibility: QuestionAccessibility) => {
              switch (accessibility) {
                case QuestionAccessibility.PRE:
                  dispatch(transferQuestionToPre(q));
                  dispatch(deleteQuestionInShared(q.order));
                  break;
                case QuestionAccessibility.POST:
                  dispatch(transferQuestionToPost(q));
                  dispatch(deleteQuestionInShared(q.order));
                  break;
                default:
              }
            }}
            accessibilityEnabled
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

export default SharedEdit;
