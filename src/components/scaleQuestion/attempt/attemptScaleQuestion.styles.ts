import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      display: 'flex',
      flexDirection: 'column',
    },
    textfieldContainer: {
      display: 'flex',
      marginBottom: theme.spacing(2),
    },
    questionText: {
      fontSize: '1.1rem',
    },
    scale: {
      marginTop: '0.5rem',
      width: '100%',
    },
  })
);
