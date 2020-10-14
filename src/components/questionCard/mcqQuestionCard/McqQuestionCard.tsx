import EditMcqQuestion from 'components/mcqQuestion/edit';
import { QuestComponentProps } from 'interfaces/components/common';
import { Question } from 'interfaces/models/admin';
import React from 'react';

const QuestionCard: React.FC<QuestComponentProps> = () => {
  return (
    <>
      <EditMcqQuestion />
    </>
  );
};

export default QuestionCard;
