import React from 'react';
import { Grid, useTheme } from '@material-ui/core';

import AppBar from 'components/appBar/AppBar';

import { useStyles } from './pageContainer.styles';

interface PageContainerProps {
  appBarChildren?: React.ReactNode;
}

const PageContainer: React.FunctionComponent<PageContainerProps> = ({
  appBarChildren,
  children,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <AppBar theme={theme}>{appBarChildren}</AppBar>
      <Grid container component="main" className={classes.root}>
        {children}
      </Grid>
    </div>
  );
};

export default PageContainer;
