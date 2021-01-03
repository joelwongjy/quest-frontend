import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
    },
    paper: {
      marginTop: '3rem',
      padding: '1rem',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      borderRadius: 12,
      [theme.breakpoints.down('sm')]: {
        boxShadow: 'none',
        padding: 0,
        backgroundColor: 'transparent',
        margin: 0,
      },
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
