import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

const Loading: React.FunctionComponent = () => {
  return (
    <Backdrop open color="primary">
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
