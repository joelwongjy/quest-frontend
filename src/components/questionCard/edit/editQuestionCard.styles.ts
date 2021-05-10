import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
      width: 120,
      minWidth: 120,
      maxWidth: 120,
    },
    textfield: {
      margin: theme.spacing(1),
      flex: 1,
      '& input': {
        backgroundColor: '#F8F8F8',
        borderRadius: 2,
      },
    },
  })
);
