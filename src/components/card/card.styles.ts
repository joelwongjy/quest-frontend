import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      borderRadius: 12,
    },
  })
);
