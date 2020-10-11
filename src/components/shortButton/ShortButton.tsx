import React from 'react';
import { Button, ButtonProps, ButtonBaseProps } from '@material-ui/core';

import { useStyles } from './shortButton.styles';

const ShortButton: React.FunctionComponent<ButtonProps & ButtonBaseProps> = (
  props
) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.root}
      {...props}
    />
  );
};

export default ShortButton;
