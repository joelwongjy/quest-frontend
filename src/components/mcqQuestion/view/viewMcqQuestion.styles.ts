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
    },
    beforeAfter: {
      color: '#675F5F',
      marginBottom: '0.5rem',
    },
    leftAnswer: {
      paddingLeft: '0.5rem',
      borderRight: '2px solid #efefef',
      paddingRight: '0.5rem',
      [theme.breakpoints.down('sm')]: {
        borderBottom: '2px solid #efefef',
        borderRight: 0,
        padding: '0 0 1rem 0',
      },
    },
    rightAnswer: {
      paddingLeft: '1rem',
      [theme.breakpoints.down('sm')]: {
        padding: '1rem 0 1rem 0.5rem',
      },
    },
    option: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '0.5rem',
      '& span.Mui-disabled': {
        color: '#675F5F',
      },
    },
    optionSelected: {
      backgroundColor: '#F5F9FC',
      borderRadius: '0.5rem',
      marginRight: '0.5rem',

      '&.is-right': {
        backgroundColor: '#F9ECF7',
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
