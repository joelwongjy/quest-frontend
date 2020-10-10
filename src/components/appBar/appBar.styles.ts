import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  containerBorder: {
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderBottomColor: theme.palette.divider,
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(1),
    },
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'stretch',
  },
  logo: {
    display: 'none',
    height: theme.spacing(8),
    padding: theme.spacing(0, 1, 0, 0),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
}));
