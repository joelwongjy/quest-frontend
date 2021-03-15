import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    student: {
      fontFamily: theme.custom.fontFamily.vt323.fontFamily,
      fontSize: '1.2rem',
    },
    admin: {
      fontFamily: theme.custom.fontFamily.roboto.fontFamily,
    },
  });
});
