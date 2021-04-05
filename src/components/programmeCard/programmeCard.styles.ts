import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    title: {
      padding: '0.6rem',
      textAlign: 'left',
      fontWeight: 600,
      color: 'black',
    },
    status: {
      marginLeft: 10,
      textAlign: 'left',
      fontSize: '1.2rem',
      color: '#bdbdbd',
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      fullWidth: true,
      padding: '0.6rem',
    },
    description: {
      marginLeft: 10,
      textAlign: 'left',
      fontSize: '0.8rem',
      color: 'text.secondary',
    },
  })
);
