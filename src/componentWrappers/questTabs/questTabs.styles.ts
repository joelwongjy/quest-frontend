import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    tab: {
      '&$selected': {
        color: '#4B4646',
        fontWeight: theme.typography.fontWeightMedium,
        textDecoration: 'underline',
      },
      '&:focus': {
        color: '',
      },
    },
  })
);
