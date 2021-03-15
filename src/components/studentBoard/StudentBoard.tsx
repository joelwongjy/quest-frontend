import React from 'react';

import { QuestComponentProps } from 'interfaces/components/common';

import { useStyles } from './studentBoard.styles';

interface StudentBoardProps extends QuestComponentProps {
  title: string;
}

const StudentBoard: React.FC<StudentBoardProps> = ({
  title,
  children,
  className = '',
}) => {
  const classes = useStyles();
  return (
    <div className={`${classes.container} ${className}`}>
      <div className={classes.title}>
        <span className={classes.titleDot}>&nbsp;</span>
        {title}
        <span className={classes.titleDot}>&nbsp;</span>
      </div>

      <div className={classes.innerBorder}>&nbsp;</div>

      <div className={classes.innerContainer}>{children}</div>
    </div>
  );
};

export default StudentBoard;
