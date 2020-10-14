import EditMcqQuestion from 'components/mcqQuestion/edit';
import { QuestComponentProps } from 'interfaces/components/common';
import React from 'react';

const QuestionCard: React.FC<QuestComponentProps> = () => {
  return (
    <>
      <EditMcqQuestion />
    </>
  );
};

export default QuestionCard;
