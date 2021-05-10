import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import backgroundImage from 'assets/images/student/background.png';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 'calc(100vh - 64px)',
      maxHeight: 'calc(100vh - 64px)',
      background: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center right',
      padding: theme.spacing(3),
      display: 'flex',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
      },
    },
    announcements: {
      maxHeight: '65%',
      minHeight: '65%',
      overflow: 'hidden',
    },
    listItem: {
      backgroundColor: '#f4d9c0',
      listStyleType: 'none',
      position: 'relative',
      padding: '1rem 1.5rem',
      margin: '0.8rem',
      [theme.breakpoints.down('sm')]: {
        margin: '0.5rem',
      },
    },
    announcementList: {
      padding: '0 0.5rem',
      margin: 0,
      height: '100%',
      overflow: 'scroll',
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
    },
    listItemTop: {
      display: 'flex',
      justifyContent: 'space-between',
      color: '#756E6E',
      fontSize: '0.9rem',
    },
    listItemTitle: {
      textDecoration: 'underline',
    },
    listItemBody: {
      fontSize: '1.1rem',
    },
    listItemSquare: {
      backgroundColor: '#323350',
      height: '0.7rem',
      width: '0.7rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 1 50%',
    },
    listItemDot: {
      backgroundColor: '#cadbd0',
      height: '0.3rem',
      width: '0.3rem',
    },
    listItemBlankSquare: {
      backgroundColor: 'transparent',
      height: '0.7rem',
      width: '0.7rem',
      flex: '0 1 50%',
    },
    listItemTopLeftCorner: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '1.4rem',
      position: 'absolute',
      left: 0,
      top: 0,
    },
    listItemTopRightCorner: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '1.4rem',
      position: 'absolute',
      right: 0,
      top: 0,
    },
    listItemBottomLeftCorner: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '1.4rem',
      position: 'absolute',
      left: 0,
      bottom: 0,
    },
    listItemBottomRightCorner: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '1.4rem',
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    mascotContainer: {
      position: 'absolute',
      zIndex: 2,
      right: 10,
      bottom: 20,
      height: '40%',
      [theme.breakpoints.down('xs')]: {
        height: '35%',
      },
    },
    mascotInnerContainer: {
      position: 'relative',
      height: '100%',
      paddingLeft: '2rem',
    },
    mascotImage: {
      height: '75%',
      position: 'absolute',
      bottom: 0,
      right: 0,
      [theme.breakpoints.down('xs')]: {
        height: '60%',
      },
    },
    mascotSpeech: {
      backgroundColor: '#D5E6EC',
      width: '50%',
      borderRadius: '1rem',
      padding: '1rem',
      position: 'relative',
      zIndex: 3,
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
        zIndex: 2,
        transform: 'rotate(-35deg)',
      },
    },
  })
);
