import React from 'react';
import { useDispatch } from 'react-redux';

import AddCircleIcon from '@material-ui/icons/AddCircleOutline';

import { QuestionAccessibility } from 'interfaces/models/questionnaires';
import {
  addQuestionToPre,
  deleteQuestionInPre,
  updateQuestionInPre,
  transferQuestionToPost,
  transferQuestionToShared,
  shiftQuestionInPre,
  duplicateQuestionInPre,
  QuestionnaireDuxQuestion,
} from 'reducers/questionnaireDux';
import QuestionCard from 'components/questionCard/edit';
import QuestCard from 'componentWrappers/questCard';

import { isEmptyQuestion } from 'utils/questionnaireUtils';
import { useStyles } from './editAccordion.styles';

interface PreEditProps {
  preQuestionSet: QuestionnaireDuxQuestion[];
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
            key={`question-pre-${question.duxId}`}
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
            isLast={order === preQuestionSet.length - 1}
            updateQuestion={(newQuestion: QuestionnaireDuxQuestion) =>
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
        <AddCircleIcon className={classes.addIcon} />
        Add a question
      </QuestCard>
    </div>
  );
};

export default PreEdit;
