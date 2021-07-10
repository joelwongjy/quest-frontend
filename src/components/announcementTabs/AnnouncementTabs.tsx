import React from 'react';

import QuestTabs from 'componentWrappers/questTabs';
import { QuestTabsProps } from 'componentWrappers/questTabs/QuestTabs';

import { useStyles } from './announcementTabs.styles';

interface AnnouncementTabsProps extends QuestTabsProps {
  buttonRight?: React.ReactNode;
  buttonLeft?: React.ReactNode;
}

const AnnouncementTabs: React.FunctionComponent<AnnouncementTabsProps> = ({
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

export default AnnouncementTabs;
