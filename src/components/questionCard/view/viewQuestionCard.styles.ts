import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      margin: '1.5rem',
      paddingBottom: '1rem',
      [theme.breakpoints.down('sm')]: {
        margin: '1.5rem 0 1.5rem 0',
      },
    },
    order: {
      marginLeft: 16,
      marginTop: 16,
      fontSize: 24,
    },
    actions: {
      marginTop: 10,
      display: 'flex',
      justifyContent: 'space-between',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 225,
    },
    textfield: {
      flex: 1,
    },
    textfieldContainer: {
      display: 'flex',
    },
  })
);
