import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';

const Input: React.FunctionComponent<TextFieldProps> = (props) => {
  return (
    <TextField
      color="secondary"
      variant="outlined"
      margin="normal"
      fullWidth
      {...props}
    />
  );
};

export default Input;
