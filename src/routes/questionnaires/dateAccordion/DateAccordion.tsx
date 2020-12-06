import React, { useState } from 'react';
import { Chip, Grid } from '@material-ui/core';

import QuestDateTimePicker from 'componentWrappers/questDateTimePicker';
import QuestAccordion from 'componentWrappers/questAccordion';
import { QuestionnaireType } from 'interfaces/models/questionnaires';
import { isBefore } from 'date-fns';

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
  const [preErrorMessage, setPreErrorMessage] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [postErrorMessage, setPostErrorMessage] = useState<string>('');

  const handlePreEndTime = (end: Date) => {
    if (isBefore(end, preStartDate)) {
      setPreErrorMessage('The end date must be after the start date!');
      return;
    }
    setPreErrorMessage('');
    preEndDateCallback(end);
  };

  const handlePostEndTime = (end: Date) => {
    if (isBefore(end, postStartDate!)) {
      setPostErrorMessage('The end date must be after the start date!');
      return;
    }
    setPostErrorMessage('');
    postEndDateCallback!(end);
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
              <div style={{ marginTop: '1rem' }}>
                <QuestDateTimePicker
                  date={preStartDate}
                  callback={preStartDateCallback}
                  label="Start Date & Time"
                />
              </div>
              <div style={{ marginTop: '1rem' }}>
                <QuestDateTimePicker
                  date={preEndDate}
                  callback={handlePreEndTime}
                  label="End Date & Time"
                />
                {preErrorMessage && <div>{preErrorMessage}</div>}
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
                <div style={{ marginTop: '1rem' }}>
                  <QuestDateTimePicker
                    date={postStartDate!}
                    callback={postStartDateCallback!}
                    label="Start Date & Time"
                  />
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <QuestDateTimePicker
                    date={postEndDate!}
                    callback={handlePostEndTime}
                    label="End Date & Time"
                  />
                </div>
                {postErrorMessage && <div>{postErrorMessage}</div>}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </QuestAccordion>
  );
};

export default DateAccordion;
