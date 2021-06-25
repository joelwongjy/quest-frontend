import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
    },
    dates: {
      fontSize: 14,
      '&.is-student': {
        marginBottom: 0,
      },
    },
    button: {
      margin: theme.spacing(1),
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',

      '&.is-student': {
        paddingTop: 0,
      },
    },
    programmeClassCardContainer: {
      paddingTop: '0.5rem',
    },
    programmeClassCard: {
      margin: '0.5rem',
    },
    chipContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  })
);
