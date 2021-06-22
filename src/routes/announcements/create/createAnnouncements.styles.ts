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
    container: {
      marginTop: '1rem',
      marginBottom: '1.5rem',
    },
    errorMessage: {
      position: 'absolute',
      top: '100%',
    },
    inputContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      '& input': {
        textAlign: 'center',
        fontWeight: 'bold',
      },
      width: '80%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      marginTop: 0,
      backgroundColor: theme.custom.icon.iconBorderColor,
      color: theme.custom.icon.iconColor,
      border: 0,
      outline: 0,
      borderRadius: 12,
      '& fieldset': {
        display: 'none',
      },
    },
    bodyContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '1rem',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      borderRadius: 12,
    },
    body: {
      width: '100%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      border: 1,
      outline: 1,
      borderRadius: 12,
    },
  })
);
