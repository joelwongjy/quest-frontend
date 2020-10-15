import React from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import { TextField } from '@material-ui/core';

import { QuestComponentProps } from 'interfaces/components/common';

import { useStyles } from './dateTimePicker.styles';

export interface QuestDateTimePickerProps extends QuestComponentProps {
  date: Date;
  callback: (newDate: Date) => void;
  label: string;
}

const QuestDateTimePicker: React.FC<QuestDateTimePickerProps> = ({
  date,
  callback,
  label,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <DateTimePicker
      className={`${classes.root} ${className}`}
      renderInput={(p) => <TextField {...p} />}
      value={date}
      onChange={(newDate) => callback(newDate!)}
      label={label}
      {...props}
    />
  );
};

export default QuestDateTimePicker;
