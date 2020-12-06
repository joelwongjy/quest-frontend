import React from 'react';
import { Card, CardProps } from '@material-ui/core';

import { QuestComponentProps } from 'interfaces/components/common';

import { useStyles } from './questCard.styles';

const QuestCard: React.FunctionComponent<QuestComponentProps & CardProps> = ({
  className,
  onClick,
  children,
}) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.root} ${className}`} onClick={onClick}>
      {children}
    </Card>
  );
};

export default QuestCard;
