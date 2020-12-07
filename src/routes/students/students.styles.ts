import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
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
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'center',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '1rem',
      paddingBottom: '0.5rem',
      backgroundColor: 'white',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
    },
    button: {
      margin: theme.spacing(1.5, 0),
      color: theme.palette.primary.main,
    },
    title: {
      marginTop: 8,
      textAlign: 'center',
    },
  })
);
