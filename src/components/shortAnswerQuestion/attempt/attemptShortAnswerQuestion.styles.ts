import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {},
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
    questionText: {
      fontSize: '1.1rem',
    },
  })
);
