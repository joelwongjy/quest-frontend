import React from 'react';
import { useDispatch } from 'react-redux';

import QuestionCard from 'components/questionCard/edit';
import { QuestionAccessibility } from 'interfaces/models/questionnaires';
import {
  addQuestionToPre,
  deleteQuestionInPre,
  duplicateQuestionInPre,
  QuestionnaireDuxQuestion,
  shiftQuestionInPre,
  updateQuestionInPre,
} from 'reducers/questionnaireDux';
import QuestCard from 'componentWrappers/questCard';

import { isEmptyQuestion } from 'utils/questionnaireUtils';
import { useStyles } from './editAccordion.styles';

interface SingleEditProps {
  questionSet: QuestionnaireDuxQuestion[];
  alertCallback: (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler: undefined | (() => void),
    cancelHandler: undefined | (() => void)
  ) => void;
}

const SingleEdit: React.FunctionComponent<SingleEditProps> = ({
  questionSet,
  alertCallback,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      {questionSet.map((q) => {
        const { order } = q;
        return (
          <QuestionCard
            key={`question-${q.duxId}`}
            question={q}
            handleDelete={() => {
              if (isEmptyQuestion(q)) {
                dispatch(deleteQuestionInPre(order));
              } else {
                alertCallback(
                  true,
                  true,
                  'Are you sure?',
                  'You will not be able to retrieve deleted questions.',
                  () => dispatch(deleteQuestionInPre(order)),
                  undefined
                );
              }
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
            isLast={order === questionSet.length - 1}
            updateQuestion={(newQuestion: QuestionnaireDuxQuestion) =>
              dispatch(updateQuestionInPre(newQuestion))
            }
            accessibility={QuestionAccessibility.SHARED}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            updateAccessibility={() => {}}
            accessibilityEnabled={false}
            alertCallback={alertCallback}
            className={classes.card}
          />
        );
      })}
      <QuestCard
        className={classes.addCard}
        onClick={() => dispatch(addQuestionToPre())}
      >
        ⊕ Add a question
      </QuestCard>
    </div>
  );
};

export default SingleEdit;
