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
    list: {
      backgroundColor: '#FBFBFA',
    },
    item: {
      color: '#044682',
      marginBottom: '1.5rem',
      border: 0,
      outline: 0,
      borderRadius: 12,
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'flex-start',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '1rem',
      paddingBottom: '0.5rem',
      backgroundColor: 'white',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
    },
  })
);
