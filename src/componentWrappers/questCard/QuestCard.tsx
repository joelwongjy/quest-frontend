import React from 'react';
import { Card, CardProps } from '@material-ui/core';

import { QuestComponentProps } from 'interfaces/components/common';

import { useStyles } from './questCard.styles';

interface QuestCardProps extends QuestComponentProps {
  hover?: boolean;
}

const QuestCard: React.FunctionComponent<QuestCardProps & CardProps> = ({
  hover,
  className,
  children,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Card
      className={`${hover ? classes.hover : classes.root} ${className}`}
      {...props}
    >
      {children}
    </Card>
  );
};

export default QuestCard;
