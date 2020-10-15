import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1.5, 0, 1.5, 1.5),
      color: theme.palette.primary.main,
      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(1.5, 1.5, 1.5, 0),
      },
    },
  })
);
