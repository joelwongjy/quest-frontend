import React from 'react';
import { Card } from '@material-ui/core';

import { QuestComponentProps } from 'interfaces/components/common';

import { useStyles } from './card.styles';

const QuestCard: React.FunctionComponent<QuestComponentProps> = ({
  className,
  children,
}) => {
  const classes = useStyles();

  return <Card className={`${classes.root} ${className}`}>{children}</Card>;
};

export default QuestCard;
