import { QuestComponentProps } from 'interfaces/components/common';
import React from 'react';

import { useStyles } from './questDialog.styles';

interface QuestDialogProps extends QuestComponentProps {
  isDialogOpen: boolean;
  dialogHeader: string;
  dialogContent: string;
  confirmHandler?: () => void;
  cancelHandler?: () => void;
}

const QuestDialog: React.FunctionComponent<QuestDialogProps> = ({
  theme,
  isDialogOpen,
  dialogHeader,
  dialogContent,
  confirmHandler,
  cancelHandler,
}) => {
  return <></>;
};
