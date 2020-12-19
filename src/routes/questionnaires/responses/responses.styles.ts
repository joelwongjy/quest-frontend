import { makeStyles, createStyles } from '@material-ui/core/styles';
import { theme } from 'styles/theme';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flex: 1,
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
      backgroundColor: '#ABC3BB',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      margin: '1.5rem',
      padding: '1.5rem',
    },
    preCard: {
      backgroundColor: '#CBE1EE',
      boxShadow: 'rgba(203, 225, 238, 0.2) 0px 8px 24px;',
      margin: '1.5rem',
      padding: '1.5rem',
    },
    postCard: {
      backgroundColor: '#E1CEC9',
      boxShadow: 'rgba(225, 206, 201, 0.2) 0px 8px 24px;',
      margin: '1.5rem',
      padding: '1.5rem',
    },
  })
);
