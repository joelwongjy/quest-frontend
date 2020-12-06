import React from 'react';
import { Button, ButtonProps, ButtonBaseProps } from '@material-ui/core';

import { useStyles } from './questButton.styles';

const QuestButton: React.FunctionComponent<ButtonProps & ButtonBaseProps> = (
  props
) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.longButton}
      {...props}
    />
  );
};

export default QuestButton;
