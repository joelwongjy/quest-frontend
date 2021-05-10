import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    top: {
      display: 'flex',
      flexDirection: 'column',
    },
    optionContainer: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    option: {
      flex: 1,
      paddingTop: '1rem',
    },
    optionButton: {
      color: 'white',
      marginBottom: '0.5rem',
      marginTop: '1rem',
    },
  })
);
