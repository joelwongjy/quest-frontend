import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dates: {
      fontSize: 14,
    },
    title: {
      marginTop: 8,
      textAlign: 'center',
      fontWeight: 'bold',
      color: theme.custom.icon.iconColor,
    },
    statusDraft: {
      marginBottom: 16,
      textAlign: 'center',
      color: '#FF6500',
      fontWeight: 500,
    },
    statusPublished: {
      marginBottom: 16,
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
  })
);
