import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    card: {
      marginLeft: 16,
      marginTop: 16,
      marginRight: 16,
      marginBottom: 8,
    },
    top: {
      display: 'flex',
    },
    textfield: {
      flex: 1,
    },
    option: {
      flex: 1,
      paddingTop: '0.5rem',
      paddingBottom: '1rem',
    },
    button: {
      color: 'white',
    },
  })
);
