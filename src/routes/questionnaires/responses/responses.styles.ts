import { makeStyles, createStyles } from '@material-ui/core/styles';
import { theme } from 'styles/theme';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flex: 1,
    },
    paper: {
      marginTop: '3rem',
      padding: '1rem',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      borderRadius: 12,
    },
    title: {
      marginTop: '2rem',
      marginBottom: '2rem',
      color: '#695F5F',
      fontWeight: 'bold',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 175,
    },
    formControlName: {
      margin: theme.spacing(1),
      minWidth: 225,
    },
    card: {
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      margin: '1.5rem',
    },
    sharedHeader: {
      backgroundColor: '#ABC3BB',
      alignItems: 'center',
      padding: '1.5rem',
    },
    preHeader: {
      backgroundColor: '#CBE2EF',
      alignItems: 'center',
      padding: '1.5rem',
    },
    postHeader: {
      backgroundColor: '#E1CEC9',
      alignItems: 'center',
      padding: '1.5rem',
    },
    modeSwitch: {
      marginRight: '1rem',
    },
  })
);
