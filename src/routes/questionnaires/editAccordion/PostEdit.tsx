import React from 'react';
import { useDispatch } from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';

import QuestionCard from 'components/questionCard/edit';
import QuestCard from 'componentWrappers/questCard';
import { QuestionAccessibility } from 'interfaces/models/questionnaires';
import {
  addQuestionToPost,
  deleteQuestionInPost,
  duplicateQuestionInPost,
  QuestionnaireDuxQuestion,
  shiftQuestionInPost,
  transferQuestionToPre,
  transferQuestionToShared,
  updateQuestionInPost,
} from 'reducers/questionnaireDux';
import { isEmptyQuestion } from 'utils/questionnaireUtils';

import { useStyles } from './editAccordion.styles';

interface PostEditProps {
  postQuestionSet: QuestionnaireDuxQuestion[];
  alertCallback: (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler: undefined | (() => void),
    cancelHandler: undefined | (() => void)
  ) => void;
}

const PostEdit: React.FunctionComponent<PostEditProps> = ({
  postQuestionSet,
  alertCallback,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      {postQuestionSet.map((q) => {
        const { order, ...question } = q;
        return (
          <QuestionCard
            key={`question-post-${question.duxId}`}
            question={q}
            handleDelete={() => {
              if (isEmptyQuestion(q)) {
                dispatch(deleteQuestionInPost(order));
              } else {
                alertCallback(
                  true,
                  true,
                  'Are you sure?',
                  'You will not be able to retrieve deleted questions.',
                  () => dispatch(deleteQuestionInPost(order)),
                  undefined
                );
              }
            }}
            handleDuplicate={() => dispatch(duplicateQuestionInPost(order))}
            handleMoveUp={() =>
              dispatch(shiftQuestionInPost({ direction: 'UP', order: q.order }))
            }
            handleMoveDown={() =>
              dispatch(
                shiftQuestionInPost({ direction: 'DOWN', order: q.order })
              )
            }
            isFirst={order === 0}
            isLast={order === postQuestionSet.length - 1}
            updateQuestion={(newQuestion: QuestionnaireDuxQuestion) =>
              dispatch(updateQuestionInPost(newQuestion))
            }
            accessibility={QuestionAccessibility.POST}
            updateAccessibility={(accessibility: QuestionAccessibility) => {
              switch (accessibility) {
                case QuestionAccessibility.PRE:
                  dispatch(transferQuestionToPre(q));
                  dispatch(deleteQuestionInPost(order));
                  break;
                case QuestionAccessibility.SHARED:
                  dispatch(transferQuestionToShared(q));
                  dispatch(deleteQuestionInPost(order));
                  break;
                default:
              }
            }}
            accessibilityEnabled
            alertCallback={alertCallback}
            className={classes.postCard}
          />
        );
      })}
      <QuestCard
        className={classes.addCard}
        onClick={() => dispatch(addQuestionToPost())}
      >
        <AddCircleIcon className={classes.addIcon} />
        Add a question
      </QuestCard>
    </div>
  );
};

export default PostEdit;
