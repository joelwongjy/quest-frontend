import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

import './Loading.scss';

const Loading: React.FC = () => {
  return (
    <Backdrop open color="primary">
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
