import React from 'react';
import { createStyles, Tab, Tabs, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import { QuestComponentProps } from 'interfaces/components/common';

export interface QuestTabsProps extends QuestComponentProps {
  value: number;
  setValue: (newValue: number) => void;
  labels: string[];
}

interface CustomTabsProps {
  value: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const CustomTabs = withStyles({
  root: {},
  indicator: {
    backgroundColor: 'transparent',
  },
})(Tabs);

const CustomTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      paddingLeft: '1rem',
      paddingRight: '1rem',
      '&:hover': {
        color: '#4B4646',
        opacity: 1,
      },
      '&$selected': {
        color: '#4B4646',
        fontWeight: theme.typography.fontWeightMedium,
        backgroundColor: '#FFDC6E',
        borderRadius: '25% 25% 0 0',
        textDecoration: 'underline',
      },
      '&:focus': {
        color: '#4B4646',
      },
    },
    selected: {},
  })
)((props: CustomTabsProps) => <Tab disableRipple {...props} />);

const QuestTabs: React.FunctionComponent<QuestTabsProps> = ({
  value,
  setValue,
  labels,
}) => {
  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <CustomTabs value={value} onChange={handleChange} aria-label="quest tabs">
      {labels.map((label) => (
        <CustomTab label={label} key={label} />
      ))}
    </CustomTabs>
  );
};

export default QuestTabs;
