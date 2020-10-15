import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import DateTimePicker from 'components/dateTimePicker';
import Accordion from 'components/accordion';
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
    <Accordion heading="Step 1: Set the duration">
      <Grid container justify="space-around">
        <DateTimePicker
          date={preStartDate}
          callback={preStartDateCallback}
          label={`Start Date & Time${
            type === QuestionnaireType.PRE_POST ? ' for Pre Survey' : ''
          }`}
        />
        <div>
          <DateTimePicker
            date={preEndDate}
            callback={handlePreEndTime}
            label={`End Date & Time${
              type === QuestionnaireType.PRE_POST ? ' for Pre Survey' : ''
            }`}
          />
          {preErrorMessage && <div>{preErrorMessage}</div>}
        </div>
      </Grid>
      {type === QuestionnaireType.PRE_POST && (
        <>
          <Grid container justify="space-around">
            <DateTimePicker
              date={postStartDate!}
              callback={postStartDateCallback!}
              label="Start Date & Time for Post Survey"
            />
            <div>
              <DateTimePicker
                date={postEndDate!}
                callback={handlePostEndTime}
                label="End Date & Time for Post Survey"
              />
            </div>
            {postErrorMessage && <div>{postErrorMessage}</div>}
          </Grid>
        </>
      )}
    </Accordion>
  );
};

export default DateAccordion;
