import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    dates: {
      fontSize: 14,
    },
    title: {
      marginTop: 8,
      textAlign: 'center',
    },
    status: {
      marginBottom: 16,
      textAlign: 'center',
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      padding: '0.6rem',
    },
  })
);
