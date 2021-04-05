import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      borderRadius: 12,
      boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
      transition: '0.3s',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
      },
    },
  })
);
