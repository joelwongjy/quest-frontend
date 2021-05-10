import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 60,
    },
    bold: {
      fontWeight: 500,
      color: theme.custom.icon.iconColor,
    },
  })
);
