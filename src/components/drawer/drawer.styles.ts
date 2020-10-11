import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { drawerWidth } from 'constants/components';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    listItem: {
      '&.Mui-selected': {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light,
      },
      '&.Mui-selected:hover': {
        backgroundColor: theme.palette.secondary.light,
      },
      '&.Mui-selected .MuiListItemIcon-root': {
        color: theme.palette.secondary.main,
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  })
);
