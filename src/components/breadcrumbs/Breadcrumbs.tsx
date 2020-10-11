import React from 'react';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';

import { QuestComponentProps } from 'interfaces/components/common';
import { Breadcrumb } from 'interfaces/components/breadcrumbs';

import { useStyles } from './breadcrumbs.styles';

export interface QuestBreadcrumbsProps extends QuestComponentProps {
  breadcrumbs: Breadcrumb[];
}

const QuestBreadcrumbs: React.FunctionComponent<QuestBreadcrumbsProps> = ({
  className,
  breadcrumbs,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      className={`${classes.root} ${className}`}
      {...props}
    >
      {breadcrumbs.slice(0, breadcrumbs.length - 1).map((bc) => (
        <Link color="inherit" href={bc.href} key={bc.text}>
          {bc.text}
        </Link>
      ))}
      <Typography color="textPrimary">
        {breadcrumbs[breadcrumbs.length - 1].text}
      </Typography>
    </Breadcrumbs>
  );
};

export default QuestBreadcrumbs;
