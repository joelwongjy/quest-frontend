import React from 'react';
import { IconButton, FormControl, FormHelperText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import QuestButton from 'componentWrappers/questButton';
import QuestTextField from 'componentWrappers/questTextField';
import { useError } from 'contexts/ErrorContext';
import { QuestionnaireDuxQuestion } from 'reducers/questionnaireDux';

import { useStyles } from './editMcqQuestion.styles';

interface EditMcqQuestionProps {
  question: QuestionnaireDuxQuestion;
  updateQuestion: (newQuestion: QuestionnaireDuxQuestion) => void;
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
  updateQuestion,
  alertCallback,
}) => {
  const classes = useStyles();
  const { hasError } = useError();

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

  const hasOptionError =
    hasError &&
    question.options.filter((q) => q.optionText !== '').length === 0;

  return (
    <div className={classes.top}>
      {question.options.map((option, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={`option-${question.duxId}-${index}`}
          className={classes.optionContainer}
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
              <FormHelperText>At least one option is required!</FormHelperText>
            )}
          </FormControl>
          {(question.options.length > 1 || index !== 0) && (
            <IconButton
              aria-label="delete"
              onClick={() => deleteOption(index)}
              style={{ marginLeft: '0.5rem', marginTop: '1rem' }}
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
};

export default EditMcqQuestion;
