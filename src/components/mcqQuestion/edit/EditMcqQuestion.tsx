import React, { useState } from 'react';
import {
  FormGroup,
  IconButton,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import QuestButton from 'componentWrappers/questButton';
import QuestTextField from 'componentWrappers/questTextField';
import { QuestionMode } from 'interfaces/models/questionnaires';
import { useError } from 'contexts/ErrorContext';
import { QuestionnaireDuxQuestion } from 'reducers/questionnaireDux';

import { useStyles } from './editMcqQuestion.styles';

interface EditMcqQuestionProps {
  question: QuestionnaireDuxQuestion;
  mode: QuestionMode;
  updateQuestion: (newQuestion: QuestionnaireDuxQuestion) => void;
  dropdown: React.ReactNode;
  alertCallback: (
    isAlertOpen: boolean,
    hasConfirm: boolean,
    alertHeader: string,
    alertMessage: string,
    confirmHandler: undefined | (() => void),
    cancelHandler: undefined | (() => void)
  ) => void;
}

const EditMcqQuestion: React.FunctionComponent<EditMcqQuestionProps> = ({
  question,
  mode,
  updateQuestion,
  dropdown,
  alertCallback,
}) => {
  const classes = useStyles();
  const { hasError } = useError();

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
    if (
      !question.options[index] ||
      question.options[index].optionText.length === 0
    ) {
      const newOptions = [...question.options];
      newOptions.splice(index, 1);
      updateQuestion({ ...question, options: newOptions });
    } else {
      alertCallback(
        true,
        true,
        'Are you sure?',
        'You will not be able to retrieve deleted options',
        () => {
          const newOptions = [...question.options];
          newOptions.splice(index, 1);
          updateQuestion({ ...question, options: newOptions });
        },
        undefined
      );
    }
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

  const hasQuestionTextError = hasError && question.questionText === '';
  const hasOptionError =
    hasError &&
    question.options.filter((q) => q.optionText !== '').length === 0;

  const renderQuestion = () => {
    switch (mode) {
      case QuestionMode.EDIT || QuestionMode.NEW:
        return (
          <div className={classes.top}>
            <div className={classes.textfieldContainer}>
              <FormControl
                style={{ width: '100%' }}
                error={hasQuestionTextError}
              >
                <QuestTextField
                  required
                  className={classes.textfield}
                  label="Question"
                  variant="filled"
                  value={question.questionText}
                  onChange={(e) => updateText(e.target.value)}
                />
                {hasQuestionTextError && (
                  <FormHelperText>The question cannot be blank!</FormHelperText>
                )}
              </FormControl>
              {dropdown}
            </div>
            {question.options.map((option, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`option-${question.duxId}-${index}`}
                style={{ width: '100%', display: 'flex', alignItems: 'center' }}
              >
                <FormControl style={{ width: '100%' }} error={hasOptionError}>
                  <QuestTextField
                    required
                    placeholder={`Option ${index + 1}`}
                    value={option.optionText}
                    onChange={(e) => updateOption(e.target.value, index)}
                    className={classes.option}
                  />
                  {hasOptionError && index === 0 && (
                    <FormHelperText>
                      At least one option is required!
                    </FormHelperText>
                  )}
                </FormControl>
                {(question.options.length > 1 || index !== 0) && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteOption(index)}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            ))}
            <QuestButton onClick={addOption} className={classes.optionButton}>
              Add Option
            </QuestButton>
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

export default EditMcqQuestion;
