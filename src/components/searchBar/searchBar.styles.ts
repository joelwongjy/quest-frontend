import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    search: {
      display: 'flex',
      justifyContent: 'center',
      maxWidth: '100%',
      transition: theme.transitions.create('all', {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: theme.spacing(1),
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      flex: 1,
      alignItems: 'center',
    },
    inputInput: {
      width: '100%',
    },
  })
);
