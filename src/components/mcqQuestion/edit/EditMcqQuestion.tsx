import React from 'react';
import { FormGroup, TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import ShortButton from 'components/shortButton/ShortButton';
import { QuestionOrder } from 'interfaces/models/questionnaires';

import { useStyles } from './editMcqQustion.styles';

interface EditMcqQuestionProps {
  question: QuestionOrder;
  updateQuestion: (newQuestion: QuestionOrder) => void;
  dropdown: React.ReactNode;
}

const EditMcqQuestion: React.FunctionComponent<EditMcqQuestionProps> = ({
  question,
  updateQuestion,
  dropdown,
}) => {
  const classes = useStyles();

  const addOption = () => {
    const newQuestion = {
      ...question,
      options: [...question.options, { optionText: '' }],
    };
    updateQuestion(newQuestion);
  };

  const deleteOption = (index: number) => {
    const newOptions = [...question.options];
    newOptions.splice(index, 1);
    updateQuestion({ ...question, options: newOptions });
  };

  const updateOption = (newOption: string, index: number) => {
    const newOptions = [...question.options];
    const updatedOption = {
      optionText: newOption,
    };
    newOptions[index] = updatedOption;
    updateQuestion({ ...question, options: newOptions });
  };

  const updateText = (newText: string) => {
    const newQuestion = { ...question, questionText: newText };
    updateQuestion(newQuestion);
  };

  return (
    <FormGroup className={classes.card}>
      <div className={classes.top}>
        <TextField
          required
          className={classes.textfield}
          label="Question"
          variant="filled"
          value={question.questionText}
          onChange={(e) => updateText(e.target.value)}
        />
        {dropdown}
      </div>
      {question.options.map((option, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={`option-${question.id}-${index}`}
          style={{ width: '100%', display: 'flex' }}
        >
          <TextField
            required
            placeholder={`Option ${index + 1}`}
            value={option.optionText}
            onChange={(e) => updateOption(e.target.value, index)}
            className={classes.option}
          />
          {(question.options.length > 1 || index !== 0) && (
            <IconButton aria-label="delete" onClick={() => deleteOption(index)}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      ))}
      <ShortButton onClick={addOption} className={classes.button}>
        Add Option
      </ShortButton>
    </FormGroup>
  );
};

export default EditMcqQuestion;
