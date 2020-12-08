import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { QuestComponentProps } from 'interfaces/components/common';

interface QuestDialogProps extends QuestComponentProps {
  isDialogOpen: boolean;
  dialogHeader: string;
  dialogContent: string;
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler?: () => void;
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
            {cancelHandler && <Button onClick={cancelHandler}>Cancel</Button>}
            {confirmHandler && (
              <Button onClick={confirmHandler}>Confirm</Button>
            )}
          </DialogActions>
        ) : (
          <DialogActions>
            <Button onClick={confirmHandler}>Okay</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default QuestDialog;
