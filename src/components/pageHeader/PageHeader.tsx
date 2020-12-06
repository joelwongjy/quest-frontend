import React from 'react';

import QuestBreadcrumbs from 'componentWrappers/questBreadcrumbs';
import { QuestBreadcrumbsProps } from 'componentWrappers/questBreadcrumbs/QuestBreadcrumbs';

import { useStyles } from './pageHeader.styles';

interface PageHeaderProps extends QuestBreadcrumbsProps {
  action?: React.ReactNode;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  breadcrumbs,
  action = null,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div {...props} className={classes.root}>
      <QuestBreadcrumbs breadcrumbs={breadcrumbs} />
      {action}
    </div>
  );
};

export default PageHeader;
