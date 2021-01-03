import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginLeft: 16,
      marginTop: 16,
      marginRight: 16,
      marginBottom: 16,
    },
    top: {
      display: 'flex',
      flexDirection: 'column',

      '&.is-single': {
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
      },
    },
    beforeAfter: {
      color: '#675F5F',
    },
    leftAnswer: {
      paddingLeft: '0.5rem',
      borderRight: '2px solid #efefef',
      paddingRight: '1rem',
      [theme.breakpoints.down('sm')]: {
        borderBottom: '2px solid #efefef',
        borderRight: 0,
        padding: '0 0.5rem 1.5rem 0.5rem',
      },
    },
    rightAnswer: {
      paddingLeft: '1rem',
      paddingRight: '0.5rem',
      [theme.breakpoints.down('sm')]: {
        padding: '1rem 0.5rem 1rem 0.5rem',
      },
    },
    textfield: {
      marginTop: '0.5rem',
      '& div > fieldset': {
        borderColor: '#1160A8 !important',
      },
      '&.is-right div > fieldset': {
        borderColor: '#A53636 !important',
      },
      '& div': {
        padding: '0.8rem',
      },
      '& input.Mui-disabled': {
        padding: 0,
        color: '#675F5F',
      },
    },
    noOption: {
      paddingRight: '1rem',
      textAlign: 'center',
      color: '#983E3A',
      fontSize: '0.9rem',
      marginTop: '0.5rem',
      marginBottom: '1rem',
    },
    noOptionContainer: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
    },
  })
);
