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
  shiftQuestionInShared,
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
            handleDuplicate={() => {
              dispatch(transferQuestionToShared(q));
            }}
            handleMoveUp={() =>
              dispatch(
                shiftQuestionInShared({ direction: 'UP', order: q.order })
              )
            }
            handleMoveDown={() =>
              dispatch(
                shiftQuestionInShared({ direction: 'DOWN', order: q.order })
              )
            }
            isFirst={order === 0}
            isLast={order === questionSet.length - 1}
            updateQuestion={(newQuestion: QuestionOrder) =>
              dispatch(updateQuestionInShared(newQuestion))
            }
            accessibility={QuestionAccessibility.SHARED}
            updateAccessibility={(accessibility: QuestionAccessibility) => {
              switch (accessibility) {
                case QuestionAccessibility.PRE:
                  dispatch(transferQuestionToPre(q));
                  dispatch(deleteQuestionInShared(order));
                  break;
                case QuestionAccessibility.POST:
                  dispatch(transferQuestionToPost(q));
                  dispatch(deleteQuestionInShared(order));
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
