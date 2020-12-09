import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    dates: {
      fontSize: 14,
    },
    title: {
      marginTop: 24,
      marginBottom: 40,
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
      fullWidth: true,
      padding: '0.6rem',
    },
    buttonHidden: {
      padding: '0.6rem',
      visibility: 'hidden',
    },
  })
);
