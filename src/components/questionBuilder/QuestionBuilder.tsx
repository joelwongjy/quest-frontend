import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import { QuestComponentProps } from 'interfaces/components/common';

const QuestionBuilder: React.FunctionComponent<QuestComponentProps> = () => {
  const [question, setQuestion] = useState('');

  const handleChange = (q: string) => {
    setQuestion(q);
  };

  return (
    <TextField
      required
      label="Question"
      variant="filled"
      value={question}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

export default QuestionBuilder;
