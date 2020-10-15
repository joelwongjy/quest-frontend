import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      width: '80%',
    },
    paperContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  })
);
