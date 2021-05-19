import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
    typeCard: {
      marginTop: '1rem',
      width: '15rem',
      height: '15rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.custom.icon.iconColor,
      color: theme.custom.icon.iconColor,
      fontSize: '1.5rem',
      '&:hover': {
        cursor: 'pointer',
      },
      margin: '1.5rem',
    },
    error: {
      backgroundColor: '#d47483',
      color: '#1a3e72',
      fontWeight: 'bold',
    },
  })
);
