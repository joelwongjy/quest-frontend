import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: '1rem',
      marginBottom: '1.5rem',
    },
    errorMessage: {
      position: 'absolute',
      top: '100%',
    },
  })
);
