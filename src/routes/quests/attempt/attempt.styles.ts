import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import backgroundImage from 'assets/images/student/background.png';
import progressBarImage from 'assets/images/student/progress-texture.png';

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
    board: {
      overflow: 'hidden',
      width: '100%',
    },
    body: {
      width: '100%',
      height: '100%',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
    },
    question: {
      flex: 1,
    },
    button: {
      textTransform: 'none',
      backgroundColor: '#976c3d',
      color: 'white',
      padding: '0 1.5rem',
      borderRadius: '1rem',
    },
    title: {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
    },
    progressBarBackground: {
      backgroundColor: '#2c594d',
      width: '100%',
      padding: '2px 4px',
      height: '1.5rem',
      position: 'relative',
      marginTop: '1rem',
    },
    progressBarForeground: {
      background: `url(${progressBarImage})`,
      backgroundRepeat: 'repeat-x',
      backgroundSize: 'auto 100%',
      borderRadius: '0.8rem',
      height: 'calc(1.5rem - 4px)',
    },
    progressFlag: {
      position: 'absolute',
      right: '-0.75rem',
      bottom: 0,
      height: '2.75rem',
    },
  })
);
