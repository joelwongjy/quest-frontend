import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import backgroundImage from 'assets/images/student/slider-background.png';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
    },
    textfieldContainer: {
      display: 'flex',
      marginBottom: theme.spacing(2),
    },
    questionText: {
      fontSize: '2rem',
    },
    scale: {
      marginTop: '0.5rem',
      width: '78.5%',
      '& span:not([role=slider])': {
        display: 'none',
      },
      marginBottom: '0.4rem',
    },
    thumb: {
      width: '3rem',
      height: '3rem',
    },
    scaleContainer: {
      width: '100%',
      [theme.breakpoints.up('lg')]: {
        width: '80%',
      },
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPositionY: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    valueContainer: {
      display: 'flex',
      position: 'absolute',
      bottom: '-3rem',
      width: '100%',
      justifyContent: 'space-between',

      '& div': {
        flex: 1,
        textAlign: 'center',
        padding: '0.3rem',
        fontSize: '1rem',
        lineHeight: '1rem',
        [theme.breakpoints.up('md')]: {
          fontSize: '1.2rem',
          padding: '0.5rem',
        },
      },
    },
    warning: {
      color: '#c74c35',
      marginTop: '0.5rem',
    },
  })
);
