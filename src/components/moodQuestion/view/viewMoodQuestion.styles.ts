import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginLeft: 24,
      marginTop: 16,
      marginRight: 24,
    },
    top: {
      display: 'flex',
      flexDirection: 'column',
    },
    emojiContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    emoji: {
      padding: '1.5rem',
    },
    emojiSelected: {
      '&.Mui-disabled': {
        backgroundColor: '#F5F9FC',
        color: '#1160A8',
        borderRadius: '0.5rem',

        '&.is-after': {
          backgroundColor: '#F9ECF7',
          color: '#A53636',

          '&::after': {
            content: "'After'",
            fontSize: '0.7rem',
            color: '#A53636',
            position: 'absolute',
            bottom: 3,
            fontWeight: 'bold',
            fontFamily: theme.custom.fontFamily.metropolis.fontFamily,
          },
        },

        '&.is-before:not(.is-after)': {
          '&::before': {
            content: "'Before'",
            fontSize: '0.7rem',
            color: '#1160A8',
            position: 'absolute',
            bottom: 3,
            fontWeight: 'bold',
            fontFamily: theme.custom.fontFamily.metropolis.fontFamily,
          },
        },

        '&.is-before.is-after': {
          background: 'linear-gradient(180deg, #F5F9FC 50%, #F9ECF7 50%)',
          color: '#854673',

          '&::before': {
            content: "'Before'",
            fontSize: '0.7rem',
            color: '#1160A8',
            position: 'absolute',
            top: 3,
            fontFamily: theme.custom.fontFamily.metropolis.fontFamily,
            fontWeight: 'bold',
          },
        },
      },
    },
  })
);
