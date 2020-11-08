import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginLeft: 16,
      marginTop: 16,
      marginRight: 16,
      marginBottom: 8,
    },
    top: {
      display: 'flex',
      flexDirection: 'column',
    },
    textfield: {
      flex: 1,
    },
    textfieldContainer: {
      display: 'flex',
      marginBottom: theme.spacing(2),
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
