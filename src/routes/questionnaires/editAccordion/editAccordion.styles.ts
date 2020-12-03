import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flex: 1,
    },
    tab: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginBottom: '10px',
    },
    input: {
      '& input': {
        textAlign: 'center',
      },
      width: '80%',
      backgroundColor: theme.custom.icon.iconBorderColor,
      color: theme.custom.icon.iconColor,
      border: 0,
      outline: 0,
      borderRadius: 12,
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      '& fieldset': {
        display: 'none',
      },
    },
    inputContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
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
    card: {
      backgroundColor: theme.custom.icon.iconBorderColor,
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      margin: '1.5rem',
      padding: '1.5rem',
    },
  })
);
