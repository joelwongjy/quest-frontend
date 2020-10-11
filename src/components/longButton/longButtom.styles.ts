import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    longButton: {
      margin: theme.spacing(3, 0, 2),
      color: theme.palette.primary.main,
    },
  })
);
