import React, { useState } from 'react';
import { Chip, FormControl, FormHelperText, Grid } from '@material-ui/core';
import { addMinutes, isAfter, isBefore } from 'date-fns';
import { differenceInMinutes } from 'date-fns/esm';

import QuestDateTimePicker from 'componentWrappers/questDateTimePicker';
import QuestAccordion from 'componentWrappers/questAccordion';
import { QuestionnaireType } from 'interfaces/models/questionnaires';

import { useStyles } from './dateAccordion.styles';

interface DateAccordionProps {
  type: QuestionnaireType;
  preStartDate: Date;
  preStartDateCallback: (newDate: Date) => void;
  preEndDate: Date;
  preEndDateCallback: (newDate: Date) => void;
  postStartDate?: Date;
  postStartDateCallback?: (newDate: Date) => void;
  postEndDate?: Date;
  postEndDateCallback?: (newDate: Date) => void;
}

const DateAccordion: React.FunctionComponent<DateAccordionProps> = ({
  type,
  preStartDate,
  preEndDate,
  preStartDateCallback,
  preEndDateCallback,
  postStartDate,
  postStartDateCallback,
  postEndDate,
  postEndDateCallback,
}) => {
  const [hasPreError, setHasPreError] = useState<boolean>(false);
  const [hasPostStartError, setHasPostStartError] = useState<boolean>(false);
  const [hasPostEndError, setHasPostEndError] = useState<boolean>(false);
  const classes = useStyles();

  const handlePreEndTime = (end: Date) => {
    if (isBefore(end, preStartDate)) {
      setHasPreError(true);
      preEndDateCallback(end);
    } else {
      setHasPreError(false);
    }
    preEndDateCallback(end);
  };

  const handlePostEndTime = (end: Date) => {
    if (isBefore(end, postStartDate!)) {
      setHasPostEndError(true);
    } else {
      setHasPostEndError(false);
    }
    postEndDateCallback!(end);
  };

  const handlePreStartTime = (start: Date) => {
    if (isAfter(start, preStartDate)) {
      const difference = differenceInMinutes(start, preStartDate);
      preEndDateCallback(addMinutes(preEndDate, difference));
    }
    preStartDateCallback(start);
  };

  const handlePostStartTime = (start: Date) => {
    if (isAfter(start, postStartDate!)) {
      const difference = differenceInMinutes(start, postStartDate!);
      postEndDateCallback!(addMinutes(postEndDate!, difference));
    }
    if (isBefore(start, preEndDate)) {
      setHasPostStartError(true);
    } else {
      setHasPostStartError(false);
    }
    postStartDateCallback!(start);
  };

  return (
    <QuestAccordion heading="Step 1: Set the duration">
      <Grid container justify="space-around">
        <Grid item xs={10}>
          <Grid container justify="space-around">
            {type === QuestionnaireType.PRE_POST && (
              <Grid item>
                <Chip
                  label="Pre-Program"
                  variant="outlined"
                  color="secondary"
                  style={{ border: '1px solid' }}
                />
              </Grid>
            )}
            <Grid container justify="space-around">
              <div className={classes.container}>
                <FormControl>
                  <QuestDateTimePicker
                    date={preStartDate}
                    callback={handlePreStartTime}
                    label="Start Date & Time"
                  />
                </FormControl>
              </div>
              <div className={classes.container}>
                <FormControl error={hasPreError}>
                  <QuestDateTimePicker
                    date={preEndDate}
                    callback={handlePreEndTime}
                    label="End Date & Time"
                  />
                  {hasPreError && (
                    <FormHelperText className={classes.errorMessage}>
                      The end date must be after the start date!
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10} style={{ marginBottom: '1rem' }}>
          {type === QuestionnaireType.PRE_POST && (
            <Grid container justify="space-around">
              <Grid item style={{ marginTop: '1.5rem' }}>
                <Chip
                  label="Post-Program"
                  variant="outlined"
                  style={{ color: '#AB6978', border: '1px solid #AB6978' }}
                />
              </Grid>

              <Grid container justify="space-around">
                <div className={classes.container}>
                  <FormControl error={hasPostStartError}>
                    <QuestDateTimePicker
                      date={postStartDate!}
                      callback={handlePostStartTime}
                      label="Start Date & Time"
                    />
                    {hasPostStartError && (
                      <FormHelperText className={classes.errorMessage}>
                        The post start date must be after the pre end date!
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className={classes.container}>
                  <FormControl error={hasPostEndError}>
                    <QuestDateTimePicker
                      date={postEndDate!}
                      callback={handlePostEndTime}
                      label="End Date & Time"
                    />
                    {hasPostEndError && (
                      <FormHelperText className={classes.errorMessage}>
                        The end date must be after the start date!
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </QuestAccordion>
  );
};

export default DateAccordion;
