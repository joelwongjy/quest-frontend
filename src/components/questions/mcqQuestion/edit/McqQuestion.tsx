import React, { useState } from 'react';
import { FormGroup, TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import QuestionBuilder from 'components/questions/QuestionBuilder';
import ShortButton from 'components/shortButton/ShortButton';

import { QuestComponentProps } from 'interfaces/components/common';

const EditMcqQuestion: React.FunctionComponent<QuestComponentProps> = () => {
  const [lines, setNewLine] = useState(1);
  const [options, setOptions] = useState(['']);

  const addOption = () => {
    setOptions([...options, '']);
    setNewLine(lines + 1);
  };

  const deleteOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const updateOption = (option: string, index: number) => {
    const newOptions = [...options];
    newOptions[index] = option;
    setOptions(newOptions);
  };

  return (
    <FormGroup>
      <QuestionBuilder />
      {options.map((option, index) => (
        <div key={index}>
          <TextField
            required
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => updateOption(e.target.value, index)}
          />
          {options.length !== 1 && (
            <IconButton aria-label="delete" onClick={() => deleteOption(index)}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      ))}
      <ShortButton onClick={addOption}>Add Option</ShortButton>
    </FormGroup>
  );
};

export default EditMcqQuestion;
