import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import backgroundImage from 'assets/images/student/background.png';
import programmeBarImage from 'assets/images/student/programme-bar.png';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 'calc(100vh - 48px)',
      maxHeight: 'calc(100vh - 48px)',
      background: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
      },
    },
    main: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
    topContainer: {
      padding: '0 1rem',
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
    },
    avatar: {
      maxWidth: '50%',
      margin: '1rem',
    },
    card: {
      backgroundColor: '#B6A17A',
      margin: '2rem',
      [theme.breakpoints.down('sm')]: {
        margin: '1rem',
      },
    },
    item: {
      padding: 0,
      fontSize: '1.5vw',
    },
    programmeBarContainer: {
      position: 'relative',
      textAlign: 'center',
      width: 'calc(100% - 2rem)',
      color: 'white',
      background: `url(${programmeBarImage})`,
      backgroundSize: '100% 100%',
      margin: '0 1rem',
    },
    programmeBarText: {
      fontSize: '1.4rem',
      padding: '0.3rem 0',
    },
    programmeClassCardContainer: {
      padding: '1.5rem',
      [theme.breakpoints.down('sm')]: {
        padding: '0.5rem',
      },
    },
    programmeClassCard: {
      backgroundColor: '#D3CFCF',
      margin: '0.5rem',
    },
    scrollable: {
      padding: 0,
      margin: 0,
      height: '100%',
      overflow: 'scroll',
      '-ms-overflow-style': 'none', // IE and Edge
      scrollbarWidth: 'none', // Firefox
      '&::-webkit-scrollbar': {
        // Chrome, Safari and Opera
        display: 'none',
      },
    },
    list: {
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    },
    header: {
      backgroundColor: '#044682',
      height: '5rem',
      alignItems: 'center',
      paddingLeft: '2rem',
      paddingRight: '1rem',
    },
    textfield: {
      flex: 1,
    },
    textfieldContainer: {
      display: 'flex',
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
