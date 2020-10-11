import React from 'react';

import Breadcrumbs from 'components/breadcrumbs';
import { QuestBreadcrumbsProps } from 'components/breadcrumbs/Breadcrumbs';

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
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {action}
    </div>
  );
};

export default PageHeader;
