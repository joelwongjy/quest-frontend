import React from 'react';

import { DateTimePicker, LocalizationProvider } from '@material-ui/pickers';

import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { Grid, TextField } from '@material-ui/core';

export interface DatePickerProps {
  startDate: Date;
  endDate: Date;
  startDateCallback: (start: Date) => void;
  endDateCallback: (end: Date) => void;
}

const QuestDatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
  const { startDate, endDate, startDateCallback, endDateCallback } = props;

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <Grid container justify="space-around">
        <DateTimePicker
          renderInput={(p) => <TextField {...p} />}
          value={startDate}
          onChange={(date) => startDateCallback(date!)}
          label="Start Date & Time"
        />
        <DateTimePicker
          renderInput={(p) => <TextField {...p} />}
          value={endDate}
          onChange={(date) => endDateCallback(date!)}
          label="End Date & Time"
        />
      </Grid>
    </LocalizationProvider>
  );
};

export default QuestDatePicker;
