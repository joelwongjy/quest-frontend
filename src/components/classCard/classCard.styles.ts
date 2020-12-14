import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    title: {
      marginTop: 24,
      marginBottom: 40,
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
  })
);
