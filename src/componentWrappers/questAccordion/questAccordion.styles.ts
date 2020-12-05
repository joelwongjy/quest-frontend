import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
      borderRadius: 12,
      marginBottom: '2rem',
      borderTop: 'none',
      '&::before': {
        height: 0,
      },
      '&.Mui-expanded': {
        marginBottom: '2rem',
      },
    },
    heading: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.custom.icon.iconColor,
    },
  })
);
