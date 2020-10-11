import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    longButton: {
      margin: theme.spacing(3, 0, 2),
      color: theme.palette.primary.main,
    },
  })
);
