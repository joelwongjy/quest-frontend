import React, { useState } from 'react';
import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
} from '@material-ui/core';

import { QuestionMode } from 'interfaces/models/questionnaires';
import QuestTextField from 'componentWrappers/questTextField';
import { useError } from 'contexts/ErrorContext';
import { QuestionnaireDuxQuestion } from 'reducers/questionnaireDux';

import QuestSlider from 'componentWrappers/questSlider';
import { useStyles } from './editScaleQuestion.styles';

interface EditScaleQuestionProps {
  question: QuestionnaireDuxQuestion;
  mode: QuestionMode;
  updateQuestion: (newQuestion: QuestionnaireDuxQuestion) => void;
  dropdown: React.ReactNode;
}

const EditScaleQuestion: React.FunctionComponent<EditScaleQuestionProps> = ({
  question,
  mode,
  updateQuestion,
  dropdown,
}) => {
  const classes = useStyles();
  const { hasError } = useError();

  const [scale, setScale] = useState<number>();

  const handleSliderChange = (
    // eslint-disable-next-line @typescript-eslint/ban-types
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    setScale(newValue as number);
  };

  const updateText = (newText: string) => {
    const newQuestion = { ...question, questionText: newText };
    updateQuestion(newQuestion);
  };

  const hasQuestionTextError = hasError && question.questionText === '';

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
            <Grid container alignItems="center" justify="space-around">
              <QuestSlider
                defaultValue={3}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                step={1}
                marks
                min={1}
                max={5}
                value={scale}
                className={classes.scale}
                onChange={handleSliderChange}
              />
            </Grid>
          </div>
        );
      default:
        return (
          <div className={classes.top}>
            <FormLabel component="legend">{question}</FormLabel>
          </div>
        );
    }
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default EditScaleQuestion;
