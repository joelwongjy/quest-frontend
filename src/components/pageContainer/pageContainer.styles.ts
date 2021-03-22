import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      display: 'flex',
    },
    content: {
      flexGrow: 1,
    },
    contentPadding: {
      padding: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
      },
    },
    toolbar: { ...theme.mixins.toolbar, minHeight: '4rem' },
  })
);
