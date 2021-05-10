import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dates: {
      fontSize: 14,
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: theme.custom.icon.iconColor,
    },
    studentTitle: {
      fontSize: '1.4rem',
      color: 'white',
    },
    statusDraft: {
      textAlign: 'center',
      color: '#FF6500',
      fontWeight: 500,
    },
    statusPublished: {
      textAlign: 'center',
      color: theme.palette.secondary.main,
      fontWeight: 500,
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      padding: '0.6rem',
    },
    buttonHidden: {
      padding: '0.6rem',
      visibility: 'hidden',
    },
    type: {
      textAlign: 'center',
      fontSize: '0.8rem',
    },
  })
);
