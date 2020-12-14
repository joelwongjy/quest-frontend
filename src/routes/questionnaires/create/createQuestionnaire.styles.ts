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
    typeCard: {
      marginTop: '1rem',
      width: '15rem',
      height: '15rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.custom.icon.iconColor,
      color: theme.custom.icon.iconColor,
      fontSize: '1.5rem',
      '&:hover': {
        cursor: 'pointer',
      },
      margin: '1.5rem',
    },
    header: {
      backgroundColor: '#044682',
      height: '5rem',
      alignItems: 'center',
      paddingLeft: '2rem',
      paddingRight: '1rem',
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
    card: {
      backgroundColor: 'white',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 4px 8px;',
      margin: '0.25rem',
      padding: '1rem',
    },
    fab: {
      position: 'fixed',
      zIndex: 5,
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  })
);
