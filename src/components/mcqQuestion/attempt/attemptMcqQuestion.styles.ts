import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
    },
    textfield: {
      flex: 1,
    },
    textfieldContainer: {
      display: 'flex',
      marginBottom: theme.spacing(2),
    },
    questionText: {
      fontSize: '2rem',
    },
    options: {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '80%',
      },
    },
    option: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f3d9c0',
      padding: '0.3rem 1rem',
      margin: '0.2rem 0',
      borderRadius: '1rem',
      border: '#323351 solid 3px',
      '& span': {
        fontFamily: theme.custom.fontFamily.vt323.fontFamily,
        fontSize: '1.2rem',
      },
    },
    radio: {
      color: '#323351',
      '&.Mui-checked': {
        color: '#323351',
      },
    },
    warning: {
      color: '#c74c35',
      marginTop: '0.5rem',
    },
  })
);
