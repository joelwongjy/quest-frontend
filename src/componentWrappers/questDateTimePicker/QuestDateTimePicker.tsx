import React from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import { createMuiTheme, MuiThemeProvider, TextField } from '@material-ui/core';

import { QuestComponentProps } from 'interfaces/components/common';

import { useStyles } from './questDateTimePicker.styles';

export interface QuestDateTimePickerProps extends QuestComponentProps {
  date: Date;
  callback: (newDate: Date) => void;
  label: string;
}

const InputMuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#044682',
    },
  },
});

const QuestDateTimePicker: React.FC<QuestDateTimePickerProps> = ({
  date,
  callback,
  label,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={InputMuiTheme}>
      <DateTimePicker
        className={`${classes.root} ${className}`}
        renderInput={(p) => <TextField {...p} />}
        value={date}
        onChange={(newDate) => callback(newDate!)}
        label={label}
        {...props}
      />
    </MuiThemeProvider>
  );
};

export default QuestDateTimePicker;
