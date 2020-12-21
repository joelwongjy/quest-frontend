import React from 'react';

import QuestTabs from 'componentWrappers/questTabs';
import { QuestTabsProps } from 'componentWrappers/questTabs/QuestTabs';

import { useStyles } from './questionnaireTabs.styles';

interface QuestionnaireTabsProps extends QuestTabsProps {
  buttonRight?: React.ReactNode;
  buttonLeft?: React.ReactNode;
}

const QuestionnaireTabs: React.FunctionComponent<QuestionnaireTabsProps> = ({
  buttonRight,
  buttonLeft,
  ...props
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <QuestTabs {...props} />
      <div>
        {buttonLeft}
        {buttonRight}
      </div>
    </div>
  );
};

export default QuestionnaireTabs;
