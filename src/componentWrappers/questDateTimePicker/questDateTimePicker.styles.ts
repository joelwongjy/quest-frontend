import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
        color: theme.palette.secondary.main,
      },
    },
  })
);
