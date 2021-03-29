import React from 'react';

import { QuestComponentProps } from 'interfaces/components/common';
import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';

interface QuestBannerProps extends QuestComponentProps {
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
  hasAction: boolean;
  action: () => void;
  actionMessage: string;
  alertMessage: string;
}

const QuestBanner: React.FunctionComponent<QuestBannerProps> = ({
  severity,
  hasAction,
  action,
  actionMessage,
  alertMessage,
}) => {
  return (
    <Alert
      severity={severity}
      action={(
        <Button
          color="inherit"
          size="small"
          onClick={hasAction ? action : undefined}
        >
          {actionMessage}
        </Button>
      )}
    >
      {alertMessage}
    </Alert>
  );
};

export default QuestBanner;
