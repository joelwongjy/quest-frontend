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

interface QuestAlertProps extends QuestComponentProps {
  isAlertOpen: boolean;
  alertHeader: string;
  alertMessage: string;
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler?: () => void;
  cancelHandler?: () => void;
}

const QuestAlert: React.FunctionComponent<QuestAlertProps> = ({
  isAlertOpen,
  alertHeader,
  alertMessage,
  hasConfirm,
  closeHandler,
  confirmHandler,
  cancelHandler,
}) => {
  return (
    <div>
      <Dialog
        open={isAlertOpen}
        onClose={closeHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{alertHeader}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-content">
            {alertMessage}
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
            <Button onClick={closeHandler}>Okay</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default QuestAlert;
