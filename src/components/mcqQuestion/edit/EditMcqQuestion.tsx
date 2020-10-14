import React, { useState } from 'react';
import { FormGroup, TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import QuestionBuilder from 'components/questionBuilder/QuestionBuilder';
import ShortButton from 'components/shortButton/ShortButton';

import { QuestComponentProps } from 'interfaces/components/common';
import { McqQuestionOption } from 'interfaces/components/mcqQuestion';

import { useStyles } from './editMcqQustion.styles';

const EditMcqQuestion: React.FunctionComponent<QuestComponentProps> = () => {
  const classes = useStyles();

  const firstOption: McqQuestionOption = { id: 0, option: '' };
  const [options, setOptions] = useState([firstOption]);

  let nextId = 1;

  const addOption = () => {
    const newOption: McqQuestionOption = { id: nextId, option: '' };
    setOptions([...options, newOption]);
    nextId += 1;
  };

  const deleteOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const updateOption = (
    oldOption: McqQuestionOption,
    newOption: string,
    index: number
  ) => {
    const newOptions = [...options];
    const updatedOption: McqQuestionOption = {
      id: oldOption.id,
      option: newOption,
    };
    newOptions[index] = updatedOption;
    setOptions(newOptions);
  };

  return (
    <FormGroup className={classes.card}>
      <QuestionBuilder />
      {options.map((option, index) => (
        <div key={option.id}>
          <TextField
            required
            placeholder={`Option ${index + 1}`}
            value={option.option}
            onChange={(e) => updateOption(option, e.target.value, index)}
          />
          {option.id !== 0 && (
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
