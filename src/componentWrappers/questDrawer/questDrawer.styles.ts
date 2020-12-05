import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { drawerWidth } from 'constants/components';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
    listItem: {
      '&.Mui-selected': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.light,
      },
      '&.Mui-selected:hover': {
        backgroundColor: theme.palette.secondary.light,
      },
      '&.Mui-selected .MuiListItemIcon-root': {
        color: theme.palette.primary.main,
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    icon: {
      color: theme.palette.primary.main,
    },
  })
);
