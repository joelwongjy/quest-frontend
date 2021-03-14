import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import backgroundImage from 'assets/images/student/background.png';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 'calc(100vh - 64px)',
      background: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      padding: theme.spacing(3),
    },
  })
);
