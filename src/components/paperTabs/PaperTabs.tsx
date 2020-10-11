import React from 'react';
import { Paper } from '@material-ui/core';

import { QuestTabsProps } from 'components/tabs/Tabs';
import Tabs from 'components/tabs';

import { useStyles } from './paperTabs.styles';

type PaperTabsProps = QuestTabsProps;

const PaperTabs: React.FunctionComponent<PaperTabsProps> = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Tabs {...props} />
    </Paper>
  );
};

export default PaperTabs;
