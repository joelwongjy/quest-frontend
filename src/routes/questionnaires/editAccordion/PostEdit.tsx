import React from 'react';
import { useDispatch } from 'react-redux';

import {
  QuestionAccessibility,
  QuestionMode,
  QuestionOrder,
} from 'interfaces/models/questionnaires';

import {
  transferQuestionToPre,
  transferQuestionToShared,
  deleteQuestionInPost,
  transferQuestionToPost,
  addQuestionToPost,
  updateQuestionInPost,
  shiftQuestionInPost,
} from 'reducers/questionnaireDux';
import { Card } from '@material-ui/core';
import QuestionCard from 'components/questionCard';
import { useStyles } from './editAccordion.styles';

interface PostEditProps {
  postQuestionSet: QuestionOrder[];
}

const PostEdit: React.FunctionComponent<PostEditProps> = ({
  postQuestionSet,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      {postQuestionSet.map((q) => {
        const { order, ...question } = q;
        return (
          <QuestionCard
            key={`question-${order}-${question.id}`}
            question={q}
            mode={QuestionMode.EDIT}
            handleDelete={() => dispatch(deleteQuestionInPost(order))}
            handleDuplicate={() => dispatch(transferQuestionToPost(q))}
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
            updateQuestion={(newQuestion: QuestionOrder) =>
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
            className={classes.postCard}
          />
        );
      })}
      <Card
        className={classes.addCard}
        onClick={() => dispatch(addQuestionToPost())}
      >
        Add a question
      </Card>
    </div>
  );
};

export default PostEdit;
