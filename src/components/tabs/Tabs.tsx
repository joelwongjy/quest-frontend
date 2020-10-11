import React from 'react';
import { Tabs, Tab } from '@material-ui/core';

import { QuestComponentProps } from 'interfaces/components/common';

import { useStyles } from './input.styles';

export interface QuestTabsProps extends QuestComponentProps {
  value: number;
  setValue: (newValue: number) => void;
  labels: string[];
}

const QuestTabs: React.FunctionComponent<QuestTabsProps> = ({
  value,
  setValue,
  labels,
  className,
}) => {
  const classes = useStyles();

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="secondary"
      textColor="secondary"
      centered
      className={`${classes.root} ${className}`}
    >
      {labels.map((label) => (
        <Tab className={classes.tab} label={label} key={label} />
      ))}
    </Tabs>
  );
};

export default QuestTabs;
