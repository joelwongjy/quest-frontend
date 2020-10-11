import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1.5, 0),
      color: theme.palette.primary.main,
    },
  })
);
