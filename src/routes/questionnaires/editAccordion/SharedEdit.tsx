import React from 'react';
import { useDispatch } from 'react-redux';

import AddCircleIcon from '@material-ui/icons/AddCircleOutline';

import { QuestionAccessibility } from 'interfaces/models/questionnaires';
import {
  addQuestionToShared,
  deleteQuestionInShared,
  duplicateQuestionInShared,
  QuestionnaireDuxQuestion,
  shiftQuestionInShared,
  transferQuestionToPost,
  transferQuestionToPre,
  updateQuestionInShared,
} from 'reducers/questionnaireDux';
import QuestionCard from 'components/questionCard/edit';
import QuestCard from 'componentWrappers/questCard';

import { isEmptyQuestion } from 'utils/questionnaireUtils';
import { useStyles } from './editAccordion.styles';

interface SharedEditProps {
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
            key={`question-${question.duxId}`}
            question={q}
            handleDelete={() => {
              if (isEmptyQuestion(q)) {
                dispatch(deleteQuestionInShared(order));
              } else {
                alertCallback(
                  true,
                  true,
                  'Are you sure?',
                  'You will not be able to retrieve deleted questions.',
                  () => dispatch(deleteQuestionInShared(order)),
                  undefined
                );
              }
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
            updateQuestion={(newQuestion: QuestionnaireDuxQuestion) =>
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
            alertCallback={alertCallback}
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
        <AddCircleIcon className={classes.addIcon} />
        Add a question
      </QuestCard>
    </div>
  );
};

export default SharedEdit;
