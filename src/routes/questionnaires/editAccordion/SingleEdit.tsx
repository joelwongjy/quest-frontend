import React from 'react';
import { useDispatch } from 'react-redux';

import QuestionCard from 'components/questionCard';
import {
  QuestionAccessibility,
  QuestionMode,
  QuestionOrder,
} from 'interfaces/models/questionnaires';
import {
  addQuestionToPre,
  deleteQuestionInPre,
  duplicateQuestionInPre,
  shiftQuestionInPre,
  transferQuestionToPre,
  updateQuestionInPre,
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
            handleDelete={() => dispatch(deleteQuestionInPre(order))}
            handleDuplicate={() => dispatch(duplicateQuestionInPre(order))}
            handleMoveUp={() =>
              dispatch(shiftQuestionInPre({ direction: 'UP', order: q.order }))
            }
            handleMoveDown={() =>
              dispatch(
                shiftQuestionInPre({ direction: 'DOWN', order: q.order })
              )
            }
            isFirst={order === 0}
            isLast={order === questionSet.length - 1}
            updateQuestion={(newQuestion: QuestionOrder) =>
              dispatch(updateQuestionInPre(newQuestion))
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
        onClick={() => dispatch(addQuestionToPre())}
      >
        Add a question
      </QuestCard>
    </div>
  );
};

export default SingleEdit;
