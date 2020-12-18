import React from 'react';
import {
  FormControl,
  FormGroup,
  Grid,
  Slider,
  withStyles,
} from '@material-ui/core';

import QuestTextField from 'componentWrappers/questTextField';

import { AnswerData } from 'interfaces/models/answers';
import { useStyles } from './viewScaleQuestion.styles';

interface ViewScaleQuestionProps {
  answer: AnswerData;
}

const ViewScaleQuestion: React.FunctionComponent<ViewScaleQuestionProps> = ({
  answer,
}) => {
  const classes = useStyles();

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
    return (
      <div className={classes.top}>
        <div className={classes.textfieldContainer}>
          <FormControl style={{ width: '100%' }}>
            <QuestTextField
              className={classes.textfield}
              label="Question"
              value={answer.questionOrder.questionText}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
        </div>
        <Grid container alignItems="center" justify="space-around">
          <CustomSlider
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={1}
            marks
            min={1}
            max={5}
            value={3}
            className={classes.scale}
          />
        </Grid>
      </div>
    );
  };

  return <FormGroup className={classes.card}>{renderQuestion()}</FormGroup>;
};

export default ViewScaleQuestion;
