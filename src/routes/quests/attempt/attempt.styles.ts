import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
    button: {
      marginBottom: '2rem',
    },
    buttonGroup: {
      margin: theme.spacing(3, 1, 0),
      marginTop: '1rem',
    },
    title: {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
    },
  })
);
