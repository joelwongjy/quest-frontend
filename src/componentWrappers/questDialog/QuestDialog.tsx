import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { QuestComponentProps } from 'interfaces/components/common';
import React from 'react';

import { useStyles } from './questDialog.styles';

interface QuestDialogProps extends QuestComponentProps {
  isDialogOpen: boolean;
  dialogHeader: string;
  dialogContent: string;
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: () => void;
}

const QuestDialog: React.FunctionComponent<QuestDialogProps> = ({
  isDialogOpen,
  dialogHeader,
  dialogContent,
  hasConfirm,
  closeHandler,
  confirmHandler,
  cancelHandler,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onClose={closeHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogHeader}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-content">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        {hasConfirm ? (
          <DialogActions>
            <Button onClick={cancelHandler}>Cancel</Button>
            <Button onClick={confirmHandler}>Confirm</Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button onClick={cancelHandler}>Okay</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default QuestDialog;
