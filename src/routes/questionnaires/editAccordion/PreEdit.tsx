import React from 'react';
import { useDispatch } from 'react-redux';

import {
  QuestionAccessibility,
  QuestionMode,
  QuestionOrder,
} from 'interfaces/models/questionnaires';
import {
  addQuestionToPre,
  deleteQuestionInPre,
  updateQuestionInPre,
  transferQuestionToPost,
  transferQuestionToShared,
  shiftQuestionInPre,
  duplicateQuestionInPre,
} from 'reducers/questionnaireDux';
import QuestionCard from 'components/questionCard';
import QuestCard from 'componentWrappers/questCard';

import { useStyles } from './editAccordion.styles';

interface PreEditProps {
  preQuestionSet: QuestionOrder[];
  alertCallback: (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler: undefined | (() => void),
    cancelHandler: undefined | (() => void)
  ) => void;
}

const PreEdit: React.FunctionComponent<PreEditProps> = ({
  preQuestionSet,
  alertCallback,
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
            handleDelete={() => {
              alertCallback(
                true,
                true,
                'Are you sure?',
                'You will not be able to retrieve deleted questions.',
                () => dispatch(deleteQuestionInPre(order)),
                undefined
              );
            }}
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
            isLast={order === preQuestionSet.length - 1}
            updateQuestion={(newQuestion: QuestionOrder) =>
              dispatch(updateQuestionInPre(newQuestion))
            }
            accessibility={QuestionAccessibility.PRE}
            updateAccessibility={(accessibility: QuestionAccessibility) => {
              switch (accessibility) {
                case QuestionAccessibility.POST:
                  dispatch(transferQuestionToPost(q));
                  dispatch(deleteQuestionInPre(order));
                  break;
                case QuestionAccessibility.SHARED:
                  dispatch(transferQuestionToShared(q));
                  dispatch(deleteQuestionInPre(order));
                  break;
                default:
              }
            }}
            accessibilityEnabled
            alertCallback={alertCallback}
            className={classes.preCard}
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

export default PreEdit;
