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
    textfield: {
      flex: 1,
    },
    textfieldContainer: {
      display: 'flex',
    },
    header: {
      backgroundColor: '#044682',
      height: '5rem',
      alignItems: 'center',
      paddingLeft: '2rem',
      paddingRight: '1rem',
    },
    headerSuccess: {
      backgroundColor: '#006633',
      height: '5rem',
      alignItems: 'center',
      paddingLeft: '2rem',
      paddingRight: '1rem',
    },
    list: {
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    },
    addIcon: {
      marginRight: '0.5rem',
    },
    button: {
      margin: theme.spacing(3, 1, 2),
    },
    subheader: {
      color: '#FF6500',
    },
  })
);
