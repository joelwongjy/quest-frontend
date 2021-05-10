import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
    },
    textfield: {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '80%',
      },
      backgroundColor: '#e9dfb4',
      borderRadius: '0.75rem',
      borderLeft: '#8b794a solid 2px',
      borderRight: '#8b794a solid 2px',
      borderTop: '#8b7a4a solid 10px',
      '& input': {
        fontFamily: theme.custom.fontFamily.vt323.fontFamily,
        fontSize: '1.2rem',
      },

      '& fieldset': {
        display: 'none',
      },
    },
    textfieldContainer: {
      display: 'flex',
      marginBottom: theme.spacing(2),
    },
    questionText: {
      fontSize: '2rem',
    },
    warning: {
      color: '#c74c35',
      marginTop: '0.5rem',
    },
  })
);
