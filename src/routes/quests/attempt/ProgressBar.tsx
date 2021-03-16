import React from 'react';

import { QuestComponentProps } from 'interfaces/components/common';
import flagImage from 'assets/images/student/flag.png';

import { useStyles } from './attempt.styles';

interface ProgressBarProps extends QuestComponentProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const classes = useStyles();
  const progress = Math.min(Math.ceil((current / total) * 100), 100);
  return (
    <div className={classes.progressBarBackground}>
      <div
        className={classes.progressBarForeground}
        style={{ width: `${progress}%` }}
      >
        &nbsp;
      </div>
      <img src={flagImage} alt="Flag" className={classes.progressFlag} />
    </div>
  );
};

export default ProgressBar;
