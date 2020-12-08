import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '80%',
    },
    paperContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    textfield: {
      flex: 1,
    },
    textfieldContainer: {
      display: 'flex',
      marginBottom: theme.spacing(2),
    },
    addCard: {
      marginTop: '1rem',
      height: '10rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: 'none',
      borderStyle: 'dashed',
      borderColor: theme.custom.icon.iconColor,
      color: theme.custom.icon.iconColor,
      fontSize: '1.5rem',
      '&:hover': {
        cursor: 'pointer',
      },
      margin: '1.5rem',
    },
  })
);
