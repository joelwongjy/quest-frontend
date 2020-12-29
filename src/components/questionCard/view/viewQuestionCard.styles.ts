import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginLeft: 16,
      marginTop: 16,
      marginRight: 16,
      marginBottom: 16,
    },
    order: {
      marginLeft: 16,
      marginTop: 16,
      fontSize: 24,
    },
    actions: {
      marginTop: 10,
      display: 'flex',
      justifyContent: 'space-between',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 225,
    },
    textfield: {
      flex: 1,
    },
    textfieldContainer: {
      display: 'flex',
    },
  })
);
