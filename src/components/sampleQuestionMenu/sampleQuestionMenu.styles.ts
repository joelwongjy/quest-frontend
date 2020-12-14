import { makeStyles, createStyles } from '@material-ui/core/styles';
import { drawerWidth } from 'constants/components';
import { theme } from 'styles/theme';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flex: 1,
    },
    paper: {
      width: '80%',
    },
    paperContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    list: {
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    },
    button: {
      margin: theme.spacing(3, 1, 2),
    },
    drawer: {
      width: drawerWidth,
      flex: 1,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#EDE9E9',
    },
    drawerContainer: {
      overflow: 'auto',
    },
    cardActionArea: {
      borderRadius: 15,
    },
    card: {
      backgroundColor: 'white',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 4px 8px;',
      margin: '0.25rem',
      padding: '1rem',
      borderRadius: 12,
    },
    fab: {
      position: 'fixed',
      zIndex: 5,
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  })
);
