import { makeStyles } from '@material-ui/core/styles';
import Splash from 'assets/images/splash.jpg';

export const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: `url(${Splash})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(0, 4),
    paddingBottom: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
}));
