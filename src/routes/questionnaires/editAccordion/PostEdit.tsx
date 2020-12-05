import React from 'react';
import { useDispatch } from 'react-redux';

import {
  QuestionAccessibility,
  QuestionMode,
  QuestionOrder,
} from 'interfaces/models/questionnaires';

import {
  addQuestionToPre,
  updateQuestionInPre,
  transferQuestionToPre,
  transferQuestionToShared,
  deleteQuestionInPost,
  transferQuestionToPost,
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
            updateQuestion={(newQuestion: QuestionOrder) =>
              dispatch(updateQuestionInPre(newQuestion))
            }
            accessibility={QuestionAccessibility.POST}
            updateAccessibility={(accessibility: QuestionAccessibility) => {
              switch (accessibility) {
                case QuestionAccessibility.PRE:
                  dispatch(transferQuestionToPre(q));
                  dispatch(deleteQuestionInPost(q.order));
                  break;
                case QuestionAccessibility.SHARED:
                  dispatch(transferQuestionToShared(q));
                  dispatch(deleteQuestionInPost(q.order));
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
        onClick={() => dispatch(addQuestionToPre())}
      >
        Add a question
      </Card>
    </div>
  );
};

export default PostEdit;
