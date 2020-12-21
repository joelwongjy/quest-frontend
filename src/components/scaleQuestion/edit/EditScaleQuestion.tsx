import React from 'react';
import {
  FormControl,
  FormGroup,
  FormHelperText,
  Grid,
} from '@material-ui/core';

import QuestTextField from 'componentWrappers/questTextField';
import { useError } from 'contexts/ErrorContext';
import { QuestionnaireDuxQuestion } from 'reducers/questionnaireDux';

import QuestSlider from 'componentWrappers/questSlider';
import { useStyles } from './editScaleQuestion.styles';

interface EditScaleQuestionProps {
  question: QuestionnaireDuxQuestion;
  updateQuestion: (newQuestion: QuestionnaireDuxQuestion) => void;
  dropdown: React.ReactNode;
}

const EditScaleQuestion: React.FunctionComponent<EditScaleQuestionProps> = ({
  question,
  updateQuestion,
  dropdown,
}) => {
  const classes = useStyles();
  const { hasError } = useError();

  const updateText = (newText: string) => {
    const newQuestion = { ...question, questionText: newText };
    updateQuestion(newQuestion);
  };

  const hasQuestionTextError = hasError && question.questionText === '';

  return (
    <FormGroup className={classes.card}>
      <div className={classes.top}>
        <div className={classes.textfieldContainer}>
          <FormControl style={{ width: '100%' }} error={hasQuestionTextError}>
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
        <Grid container alignItems="center" justify="space-around">
          <QuestSlider
            defaultValue={3}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={1}
            marks
            min={1}
            max={5}
            value={3}
            className={classes.scale}
            disabled
          />
        </Grid>
      </div>
    </FormGroup>
  );
};

export default EditScaleQuestion;
