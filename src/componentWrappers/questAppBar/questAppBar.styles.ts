import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { drawerWidth } from 'constants/components';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    appBar: {
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px',
      borderBottomColor: theme.palette.divider,
    },
    appBarShorten: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(1),
      },
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    logoContainer: {
      display: 'flex',
      justifyContent: 'stretch',
    },
    logo: {
      height: theme.spacing(8),
      padding: theme.spacing(0, 1, 0, 0),
    },
    title: {
      ...theme.custom.fontFamily.metropolis!,
      display: 'none',
      [theme.breakpoints.up('xs')]: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    childrenContainer: {
      flexGrow: 1,
      marginLeft: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        flexGrow: 0,
        width: theme.spacing(90),
        marginLeft: theme.spacing(9),
      },
    },
    account: {
      marginLeft: theme.spacing(1),
      fontWeight: 'bold',
      color: theme.custom.icon.iconColor,
    },
    profile: {
      height: '30px',
    },
  })
);
