import { makeStyles, createStyles } from '@material-ui/core/styles';
import { theme } from 'styles/theme';

export const useStyles = makeStyles(() =>
  createStyles({
    typeCard: {
      width: '15rem',
      height: '15rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.custom.icon.iconColor,
      color: theme.custom.icon.iconColor,
      fontSize: '1.5rem',
      transition: theme.transitions.create(['background', 'background-color'], {
        duration: theme.transitions.duration.complex,
      }),
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#FFF9E8',
      },
      margin: '1.5rem',
    },
    header: {
      backgroundColor: '#044682',
      height: '5rem',
      alignItems: 'center',
      paddingLeft: '2rem',
      paddingRight: '1rem',
    },
    list: {
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    },
    button: {
      margin: theme.spacing(3, 1, 2),
    },
  })
);
