import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';

const QuestTextField: React.FunctionComponent<TextFieldProps> = (props) => {
  return <TextField color="primary" variant="outlined" fullWidth {...props} />;
};

export default QuestTextField;
