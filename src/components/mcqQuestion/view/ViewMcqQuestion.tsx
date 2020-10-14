import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

import { QuestComponentProps } from 'interfaces/components/common';

export interface QuestMcqProps extends QuestComponentProps {
  question: string;
  options: string[];
}

const ViewMcqQuestion: React.FunctionComponent<QuestMcqProps> = ({
  question,
  options,
}) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{question}</FormLabel>
      <RadioGroup
        aria-label="options"
        name="options"
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ViewMcqQuestion;
