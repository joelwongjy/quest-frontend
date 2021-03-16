import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
    },
    textfield: {
      flex: 1,
    },
    textfieldContainer: {
      display: 'flex',
      marginBottom: theme.spacing(2),
    },
    questionText: {
      fontSize: '2rem',
    },
    emojiContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '80%',
      },
    },
    button: {
      width: '20%',
    },
    image: {
      width: '100%',
      opacity: 0.5,

      '&.is-selected': {
        opacity: 1,
      },
    },
    warning: {
      color: '#c74c35',
      marginTop: '0.5rem',
    },
  })
);
