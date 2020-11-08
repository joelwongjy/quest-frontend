import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginLeft: 16,
      marginTop: 16,
      marginRight: 16,
      marginBottom: 20,
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
  })
);
