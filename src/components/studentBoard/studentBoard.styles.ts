import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: '#976b3e',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      paddingBottom: '2.5rem',
      height: '100%',
      overflow: 'hidden',
    },
    title: {
      backgroundColor: '#662c2a',
      color: 'white',
      padding: '0.25rem',
      fontSize: '1.4rem',
      borderRadius: '1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    titleDot: {
      backgroundColor: 'white',
      height: '0.5rem',
      width: '0.5rem',
      margin: '0.75rem',
    },
    innerBorder: {
      border: '#604526 0.5rem solid',
      position: 'absolute',
      height: 'calc(100% - 2rem)',
      width: 'calc(100% - 2rem)',
      top: '1rem',
      left: '1rem',
      zIndex: 0,
      [theme.breakpoints.down('sm')]: {
        borderLeft: 'none',
        borderRight: 'none',
      },
    },
    accessoryContainer: {
      width: 'calc(100% - 5rem)',
      zIndex: 1,
      [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 2rem)',
      },
    },
    innerContainer: {
      backgroundColor: '#d3b488',
      height: '100%',
      width: 'calc(100% - 5rem)',
      border: '#a6957d 0.25rem solid',
      zIndex: 1,
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 2rem)',
      },
    },
  })
);
