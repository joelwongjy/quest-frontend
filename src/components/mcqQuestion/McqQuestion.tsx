import React, { useState } from 'react';
import {
  FormGroup,
  TextField,
  IconButton,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import ShortButton from 'components/shortButton/ShortButton';
import { QuestionOrder, QuestionMode } from 'interfaces/models/questionnaires';

import { useStyles } from './McqQuestion.styles';

interface McqQuestionProps {
  question: QuestionOrder;
  mode: QuestionMode;
  updateQuestion: (newQuestion: QuestionOrder) => void;
  dropdown: React.ReactNode;
}

const McqQuestion: React.FunctionComponent<McqQuestionProps> = ({
  question,
  mode,
  updateQuestion,
  dropdown,
}) => {
  const classes = useStyles();

  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

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
  const renderQuestion = () => {
    switch (mode) {
      case QuestionMode.EDIT || QuestionMode.NEW:
        return (
          <div className={classes.top}>
            <div className={classes.textfieldContainer}>
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
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteOption(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            ))}
            <ShortButton onClick={addOption} className={classes.button}>
              Add Option
            </ShortButton>
          </div>
        );
      default:
        return (
          <div className={classes.top}>
            <FormLabel component="legend">{question}</FormLabel>
            <RadioGroup
              aria-label="options"
              name="options"
              value={value}
              onChange={handleChange}
            >
              {question.options.map((option) => (
                <FormControlLabel
                  key={option.optionText}
                  value={option.optionText}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </div>
        );
    }
  };
  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default McqQuestion;
