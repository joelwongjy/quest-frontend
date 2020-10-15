import React from 'react';

import Tabs from 'components/tabs';
import { QuestTabsProps } from 'components/tabs/Tabs';

import { useStyles } from './questionnaireTabs.styles';

interface QuestionnaireTabsProps extends QuestTabsProps {
  buttonRight: React.ReactNode;
  buttonLeft: React.ReactNode;
}

const QuestionnaireTabs: React.FunctionComponent<QuestionnaireTabsProps> = ({
  buttonRight,
  buttonLeft,
  ...props
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Tabs {...props} />
      <div>
        {buttonLeft}
        {buttonRight}
      </div>
    </div>
  );
};

export default QuestionnaireTabs;
