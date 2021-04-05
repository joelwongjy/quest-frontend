import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    hover: {
      flexGrow: 1,
      borderRadius: 12,
      boxShadow: '0 0 6px 0 rgba(0,0,0,0.08)',
      transition: '0.3s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 4px 6px 0 rgba(0,0,0,0.18)',
      },
    },
    root: {
      flexGrow: 1,
      borderRadius: 12,
      boxShadow: '0 0 6px 0 rgba(0,0,0,0.08)',
    },
  })
);
