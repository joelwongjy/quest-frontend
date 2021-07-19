import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dates: {
      fontSize: 12,
      '&.is-student': {
        marginBottom: 0,
      },
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 28,
      color: 'black',
    },
    studentTitle: {
      fontSize: '1.4rem',
      color: 'white',
    },
    progammeName: {
      textAlign: 'center',
      color: theme.palette.secondary.main,
      fontWeight: 500,
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',

      '&.is-student': {
        paddingTop: 0,
      },
    },
    button: {
      padding: '0.6rem',
      fontSize: 12,
    },
    buttonHidden: {
      padding: '0.6rem',
      visibility: 'hidden',
    },
    type: {
      textAlign: 'center',
      fontSize: '0.8rem',
    },
  })
);
