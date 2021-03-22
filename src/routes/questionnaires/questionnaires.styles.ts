import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
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
    fab: {
      position: 'fixed',
      zIndex: 5,
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  })
);
