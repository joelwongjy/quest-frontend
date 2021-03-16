import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import backgroundImage from 'assets/images/student/background.png';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 'calc(100vh - 64px)',
      maxHeight: 'calc(100vh - 64px)',
      background: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
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
    profile: {
      overflow: 'hidden',
      width: '90%',
      height: '90%',
    },
    avatar: {
      maxWidth: '50%',
      margin: '1rem',
    },
    card: {
      backgroundColor: '#B6A17A',
      margin: '2rem',
    },
    item: {
      padding: 0,
      fontSize: '1.5vw',
    },
    programmeBar: {
      maxWidth: '90%',
      minHeight: '100%',
    },
    programmeBarContainer: {
      position: 'relative',
      textAlign: 'center',
      color: 'white',
    },
    centered: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    programmeClassCard: {
      backgroundColor: '#D3CFCF',
      margin: '1rem',
    },
    scrollable: {
      padding: '0 0.5rem',
      margin: 0,
      height: '100%',
      overflow: 'scroll',
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
  })
);
