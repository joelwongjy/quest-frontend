import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: '1.5rem',
      borderRadius: '1rem',
      border: '1px solid #CCCCCC',
      overflow: 'hidden',

      [theme.breakpoints.down('md')]: {
        marginLeft: 0,
        marginRight: 0,
      },
    },
  })
);
