import React, { useState } from 'react';
import { useTheme } from '@material-ui/core';

import QuestAppBar from 'componentWrappers/questAppBar/QuestAppBar';
import QuestDrawer from 'componentWrappers/questDrawer';
import { useUser } from 'contexts/UserContext';

import { useStyles } from './pageContainer.styles';

interface PageContainerProps {
  appBarChildren?: React.ReactNode;
  hasDrawer?: boolean;
  hasToolbarPadding?: boolean;
  hasContentPadding?: boolean;
}

const PageContainer: React.FunctionComponent<PageContainerProps> = ({
  hasDrawer = true,
  appBarChildren,
  hasToolbarPadding = true,
  hasContentPadding = true,
  children,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { isStaff } = useUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => setIsDrawerOpen((state: boolean) => !state);

  const contentClassName = `${classes.content}${
    hasContentPadding ? ` ${classes.contentPadding}` : ''
  }`;

  return (
    <div className={classes.root}>
      <QuestAppBar
        theme={theme}
        hasDrawer={hasDrawer}
        toggleDrawer={toggleDrawer}
      >
        {appBarChildren}
      </QuestAppBar>
      {hasDrawer && (
        <QuestDrawer
          theme={theme}
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
        />
      )}
      <main className={contentClassName}>
        {hasToolbarPadding && (
          <div
            className={`${classes.toolbar} ${isStaff ? '' : 'is-student'}`}
          />
        )}
        {children}
      </main>
    </div>
  );
};

export default PageContainer;
