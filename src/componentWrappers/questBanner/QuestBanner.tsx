import React from 'react';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { QuestComponentProps } from 'interfaces/components/common';

interface QuestBannerProps extends QuestComponentProps {
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
  hasAction: boolean;
  action: () => void;
  actionMessage: string;
  discard?: () => void;
  discardMessage?: string;
  alertMessage: string;
}

const QuestBanner: React.FunctionComponent<QuestBannerProps> = ({
  severity,
  hasAction,
  action,
  actionMessage,
  discard,
  discardMessage,
  alertMessage,
}) => {
  return (
    <Alert
      severity={severity}
      action={
        discard === undefined ? (
          <Button
            key="action"
            color="inherit"
            size="small"
            onClick={hasAction ? action : undefined}
          >
            {actionMessage}
          </Button>
        ) : (
          [
            <Button
              key="action"
              color="secondary"
              size="small"
              onClick={hasAction ? action : undefined}
            >
              {actionMessage}
            </Button>,
            <Button
              key="discard"
              color="inherit"
              size="small"
              onClick={discard}
              style={{ color: 'orange' }}
            >
              {discardMessage}
            </Button>,
          ]
        )
      }
    >
      {alertMessage}
    </Alert>
  );
};

export default QuestBanner;
