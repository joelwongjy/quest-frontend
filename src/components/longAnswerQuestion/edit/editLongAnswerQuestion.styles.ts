import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    card: {
      marginLeft: 16,
      marginTop: 16,
      marginRight: 16,
      marginBottom: 20,
    },
    top: {
      display: 'flex',
    },
    textfield: {
      flex: 1,
    },
  })
);
