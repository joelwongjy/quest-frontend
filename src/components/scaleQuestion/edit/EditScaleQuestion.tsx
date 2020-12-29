import React from 'react';
import { Grid } from '@material-ui/core';

import QuestSlider from 'componentWrappers/questSlider';

import { useStyles } from './editScaleQuestion.styles';

const EditScaleQuestion: React.FC = () => {
  const classes = useStyles();

  return (
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
  );
};

export default EditScaleQuestion;
