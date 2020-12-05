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
} from 'reducers/questionnaireDux';
import QuestionCard from 'components/questionCard';
import QuestCard from 'componentWrappers/questCard';

import { useStyles } from './editAccordion.styles';

interface PreEditProps {
  preQuestionSet: QuestionOrder[];
}

const PreEdit: React.FunctionComponent<PreEditProps> = ({ preQuestionSet }) => {
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
            handleDelete={() => dispatch(deleteQuestionInPre(order))}
            updateQuestion={(newQuestion: QuestionOrder) =>
              dispatch(updateQuestionInPre(newQuestion))
            }
            accessibility={QuestionAccessibility.PRE}
            updateAccessibility={(accessibility: QuestionAccessibility) => {
              switch (accessibility) {
                case QuestionAccessibility.POST:
                  dispatch(transferQuestionToPost(q));
                  dispatch(deleteQuestionInPre(q.order));
                  break;
                case QuestionAccessibility.SHARED:
                  dispatch(transferQuestionToShared(q));
                  dispatch(deleteQuestionInPre(q.order));
                  break;
                default:
              }
            }}
            accessibilityEnabled
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
