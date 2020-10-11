import React from 'react';
import { Button, ButtonBaseProps, ButtonProps } from '@material-ui/core';

import { useStyles } from './longButton.styles';

const LongButton: React.FunctionComponent<ButtonProps & ButtonBaseProps> = (
  props
) => {
  const classes = useStyles();
  return (
    <Button
      fullWidth
      variant="contained"
      color="secondary"
      className={classes.longButton}
      {...props}
    />
  );
};

export default LongButton;
