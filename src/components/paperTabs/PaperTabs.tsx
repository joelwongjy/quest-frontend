import React from 'react';
import { Paper } from '@material-ui/core';

import { QuestTabsProps } from 'componentWrappers/questTabs/QuestTabs';
import QuestTabs from 'componentWrappers/questTabs';

import { useStyles } from './paperTabs.styles';

type PaperTabsProps = QuestTabsProps;

const PaperTabs: React.FunctionComponent<PaperTabsProps> = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <QuestTabs {...props} />
    </Paper>
  );
};

export default PaperTabs;
