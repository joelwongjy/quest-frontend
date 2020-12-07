import React, { useState } from 'react';
import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Slider,
  withStyles,
} from '@material-ui/core';

import { QuestionOrder, QuestionMode } from 'interfaces/models/questionnaires';
import QuestTextField from 'componentWrappers/questTextField';
import { useError } from 'contexts/ErrorContext';

import { useStyles } from './ScaleQuestion.styles';

interface ScaleQuestionProps {
  question: QuestionOrder;
  mode: QuestionMode;
  updateQuestion: (newQuestion: QuestionOrder) => void;
  dropdown: React.ReactNode;
}

const ScaleQuestion: React.FunctionComponent<ScaleQuestionProps> = ({
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

  const customBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

  const CustomSlider = withStyles({
    root: {
      color: '#034682',
      height: 2,
      padding: '15px 0',
    },
    thumb: {
      height: 28,
      width: 28,
      backgroundColor: '#fff',
      boxShadow: customBoxShadow,
      marginTop: -14,
      marginLeft: -14,
      '&:focus, &:hover, &$active': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: customBoxShadow,
        },
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 12px)',
      top: -20,
      fontSize: '16px',
      '& *': {
        background: 'transparent',
        color: '#000',
      },
    },
    track: {
      height: 4,
    },
    rail: {
      height: 4,
      opacity: 0.5,
      backgroundColor: '#bfbfbf',
    },
    mark: {
      backgroundColor: '#bfbfbf',
      height: 11,
      width: 2,
      marginTop: -3,
    },
    markActive: {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  })(Slider);

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
              <CustomSlider
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

export default ScaleQuestion;
