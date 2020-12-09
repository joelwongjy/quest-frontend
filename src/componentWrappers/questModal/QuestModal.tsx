import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { QuestComponentProps } from 'interfaces/components/common';

interface QuestModalProps extends QuestComponentProps {
  name: string;
  description: string;
  isModalOpen: boolean;
  toggleModal: () => void;
}

const QuestModal: React.FC<QuestModalProps> = ({
  name,
  description,
  isModalOpen,
  toggleModal,
}) => {
  return (
    <Dialog
      open={isModalOpen}
      onClose={toggleModal}
      maxWidth="xs"
      aria-labelledby="programme-title"
      aria-describedby="programme-description"
    >
      <DialogTitle id="programme-title">{name}</DialogTitle>
      <DialogContent>
        <DialogContentText id="programme-description">
          {description}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default QuestModal;
