import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1.5, 0),
      color: theme.palette.primary.main,
    },
    title: {
      marginTop: 8,
      textAlign: 'center',
    },
  })
);
