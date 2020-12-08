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
  duplicateQuestionInShared,
  shiftQuestionInShared,
  transferQuestionToPost,
  transferQuestionToPre,
  updateQuestionInShared,
} from 'reducers/questionnaireDux';
import QuestionCard from 'components/questionCard';
import QuestCard from 'componentWrappers/questCard';

import { useStyles } from './editAccordion.styles';

interface SharedEditProps {
  questionSet: QuestionOrder[];
  alertCallback: (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler: undefined | (() => void),
    cancelHandler: undefined | (() => void)
  ) => void;
}

const SharedEdit: React.FunctionComponent<SharedEditProps> = ({
  questionSet,
  alertCallback,
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
            handleDelete={() => {
              alertCallback(
                true,
                true,
                'Are you sure?',
                'You will not be able to retrieve deleted questions.',
                () => dispatch(deleteQuestionInShared(order)),
                undefined
              );
            }}
            handleDuplicate={() => {
              dispatch(duplicateQuestionInShared(order));
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
      <QuestCard
        className={classes.addCard}
        onClick={() => {
          dispatch(addQuestionToShared());
        }}
      >
        Add a question
      </QuestCard>
    </div>
  );
};

export default SharedEdit;
