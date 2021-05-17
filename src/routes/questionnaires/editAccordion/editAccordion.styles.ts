import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flex: 1,
    },
    tab: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      marginBottom: '10px',
    },
    subheading: {
      fontSize: 18,
      marginTop: '1rem',
      marginLeft: '0.5rem',
    },
    input: {
      '& input': {
        textAlign: 'center',
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
      boxShadow: 'rgba(149, 157, 165, 0.1) 0px 4px 12px;',
      '& fieldset': {
        display: 'none',
      },
    },
    inputContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
      [theme.breakpoints.down('md')]: {
        margin: '0',
      },
      borderRadius: 0,
    },
    card: {
      backgroundColor: theme.custom.icon.iconBorderColor,
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      margin: '1.5rem',
      padding: '1.5rem',
    },
    preCard: {
      backgroundColor: '#CBE1EE',
      boxShadow: 'rgba(203, 225, 238, 0.2) 0px 8px 24px;',
      margin: '1.5rem',
      padding: '1.5rem',
    },
    postCard: {
      backgroundColor: '#E1CEC9',
      boxShadow: 'rgba(225, 206, 201, 0.2) 0px 8px 24px;',
      margin: '1.5rem',
      padding: '1.5rem',
    },
    typography: {
      marginTop: '1rem',
      marginLeft: '0.5rem',
    },
    modeSwitch: {
      marginRight: '1rem',
    },
    addIcon: {
      marginRight: '0.5rem',
    },
  })
);
