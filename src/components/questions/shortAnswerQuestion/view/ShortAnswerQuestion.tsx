import React, { useState } from 'react';

import { FormGroup, TextField } from '@material-ui/core';

import { QuestComponentProps } from 'interfaces/components/common';

const QuestionBuilder: React.FunctionComponent<QuestComponentProps> = () => {
  const [question, setQuestion] = useState('');

  const handleChange = (q: string) => {
    setQuestion(q);
  };

  return (
    <FormGroup>
      <TextField
        required
        label="Question"
        variant="filled"
        value={question}
        onChange={(e) => handleChange(e.target.value)}
      />
      <TextField disabled id="disabled" defaultValue="Short answer text" />
    </FormGroup>
  );
};

export default QuestionBuilder;
