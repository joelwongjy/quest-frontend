import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';

import { useStyles } from './longButton.styles';

const LongButton: React.FunctionComponent<ButtonProps> = (props) => {
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
