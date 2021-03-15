import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import backgroundImage from 'assets/images/student/background.png';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 'calc(100vh - 56px)',
      background: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: theme.spacing(3),
      display: 'flex',
      justifyContent: 'flex-end',
    },
    main: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
    button: {
      margin: theme.spacing(1.5, 0, 1.5, 1.5),
      color: theme.palette.primary.main,
      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(1.5, 1.5, 1.5, 0),
      },
    },
    buttonGroup: {
      margin: theme.spacing(3, 1, 0),
      marginTop: '1rem',
    },
    quests: {
      minHeight: '75%',
      maxWidth: '75%',
      minWidth: '75%',
      overflow: 'hidden',
    },
    card: {
      backgroundColor: '#F7F6DA',
    },
    mascotContainer: {
      position: 'absolute',
      zIndex: 2,
      right: 10,
      bottom: 20,
      height: '40%',
    },
    mascotInnerContainer: {
      position: 'relative',
      height: '100%',
      paddingLeft: '2rem',
    },
    mascotImage: {
      height: '60%',
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    mascotSpeech: {
      backgroundColor: '#D5E6EC',
      width: '60%',
      borderRadius: '1rem',
      padding: '1rem',
      position: 'relative',
      '&:after': {
        content: "''",
        display: 'block' /* reduce the damage in FF3.0 */,
        position: 'absolute',
        bottom: '-15px',
        right: '5px',
        width: 0,
        borderWidth: '25px 8px 0 8px',
        borderStyle: 'solid',
        borderColor: '#D5E6EC transparent',
        zIndex: -1,
        transform: 'rotate(-35deg)',
      },
    },
  })
);
