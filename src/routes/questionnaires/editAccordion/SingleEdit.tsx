import React from 'react';
import { useDispatch } from 'react-redux';

import QuestionCard from 'components/questionCard';
import {
  QuestionAccessibility,
  QuestionMode,
  QuestionOrder,
} from 'interfaces/models/questionnaires';
import {
  addQuestionToShared,
  deleteQuestionInShared,
  shiftQuestionInShared,
  transferQuestionToShared,
  updateQuestionInShared,
} from 'reducers/questionnaireDux';
import QuestCard from 'componentWrappers/questCard';

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
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            updateAccessibility={() => {}}
            accessibilityEnabled={false}
            className={classes.card}
          />
        );
      })}
      <QuestCard
        className={classes.addCard}
        onClick={() => dispatch(addQuestionToShared())}
      >
        Add a question
      </QuestCard>
    </div>
  );
};

export default SingleEdit;
