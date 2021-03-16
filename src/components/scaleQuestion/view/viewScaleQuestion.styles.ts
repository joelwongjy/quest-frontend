import { makeStyles, createStyles } from '@material-ui/core/styles';
import { adminTheme } from 'styles/theme';

const toggleBlueStyles = {
  backgroundColor: '#1160A8',

  '&::after': {
    backgroundColor: '#F5F9FC',
    zIndex: -1,
    top: -28,
    left: -28,
    right: -28,
    bottom: -28,
    borderRadius: '0.5rem',
  },
};

const toggleRedStyles = {
  backgroundColor: '#A53636',

  '&::after': {
    backgroundColor: '#F9ECF7',
    zIndex: -1,
    top: -28,
    left: -28,
    right: -28,
    bottom: -28,
    borderRadius: '0.5rem',
  },
};

const togglePurpleStyles = {
  backgroundColor: '#854673',

  '&::after': {
    background: 'linear-gradient(180deg, #F5F9FC 50%, #F9ECF7 50%)',
    zIndex: -1,
    top: -28,
    left: -28,
    right: -28,
    bottom: -28,
    borderRadius: '0.5rem',
  },
};

const beforeLabelStyles = {
  '&::before': {
    content: "'Before'",
    fontSize: '0.7rem',
    color: '#1160A8',
    position: 'absolute',
    bottom: -28,
    fontFamily: adminTheme.custom.fontFamily.metropolis.fontFamily,
    fontWeight: 'bold',
  },
};

const beforeTopLabelStyles = {
  display: 'inline-block',

  '&::before': {
    content: "'Before\\A\\A\\A\\A After'",
    lineHeight: '1.1rem',
    marginLeft: -4,
    whiteSpace: 'pre',
    textAlign: 'center',
    fontSize: '0.7rem',
    color: '#A53636',
    position: 'absolute',
    bottom: -28,
    fontFamily: adminTheme.custom.fontFamily.metropolis.fontFamily,
    fontWeight: 'bold',
  },

  '&::first-line': {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '0.7rem',
    fontFamily: adminTheme.custom.fontFamily.metropolis.fontFamily,
    color: '#1160A8',
  },
};

const afterLabelStyles = {
  '&::before': {
    content: "'After'",
    fontSize: '0.7rem',
    color: '#A53636',
    position: 'absolute',
    bottom: -28,
    fontFamily: adminTheme.custom.fontFamily.metropolis.fontFamily,
    fontWeight: 'bold',
  },
};

export const useStyles = makeStyles(() =>
  createStyles({
    card: {
      marginLeft: 16,
      marginTop: 16,
      marginRight: 16,
      marginBottom: 8,
    },
    top: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    scale: {
      zIndex: 1,
      width: 'calc(100% - 6rem)',
      margin: '2rem 3rem 1.5rem 3rem',
      '&:hover': {
        cursor: 'default',
      },
      '& > span:not([role="slider"])': {
        color: '#dfdfdf !important',
      },

      '& span[role="slider"]': {
        boxShadow: 'none',
      },

      '&.has-before.is-blue-1:not(.is-red-1) span[role="slider"][aria-valuenow="1"]': {
        ...beforeLabelStyles,
      },
      '&.has-before.is-blue-2:not(.is-red-2) span[role="slider"][aria-valuenow="2"]': {
        ...beforeLabelStyles,
      },
      '&.has-before.is-blue-3:not(.is-red-3) span[role="slider"][aria-valuenow="3"]': {
        ...beforeLabelStyles,
      },
      '&.has-before.is-blue-4:not(.is-red-4) span[role="slider"][aria-valuenow="4"]': {
        ...beforeLabelStyles,
      },
      '&.has-before.is-blue-5:not(.is-red-5) span[role="slider"][aria-valuenow="5"]': {
        ...beforeLabelStyles,
      },

      '&.has-after.is-red-1:not(.is-blue-1) span[role="slider"][aria-valuenow="1"]': {
        ...afterLabelStyles,
      },
      '&.has-after.is-red-2:not(.is-blue-1) span[role="slider"][aria-valuenow="2"]': {
        ...afterLabelStyles,
      },
      '&.has-after.is-red-3:not(.is-blue-1) span[role="slider"][aria-valuenow="3"]': {
        ...afterLabelStyles,
      },
      '&.has-after.is-red-4:not(.is-blue-1) span[role="slider"][aria-valuenow="4"]': {
        ...afterLabelStyles,
      },
      '&.has-after.is-red-5:not(.is-blue-1) span[role="slider"][aria-valuenow="5"]': {
        ...afterLabelStyles,
      },

      '&.is-blue-1:not(.is-red-1) span[role="slider"][aria-valuenow="1"]': {
        ...toggleBlueStyles,
      },
      '&.is-blue-2:not(.is-red-2) span[role="slider"][aria-valuenow="2"]': {
        ...toggleBlueStyles,
      },
      '&.is-blue-3:not(.is-red-3) span[role="slider"][aria-valuenow="3"]': {
        ...toggleBlueStyles,
      },
      '&.is-blue-4:not(.is-red-4) span[role="slider"][aria-valuenow="4"]': {
        ...toggleBlueStyles,
      },
      '&.is-blue-5:not(.is-red-5) span[role="slider"][aria-valuenow="5"]': {
        ...toggleBlueStyles,
      },

      '&.is-red-1:not(.is-blue-1) span[role="slider"][aria-valuenow="1"]': {
        ...toggleRedStyles,
      },
      '&.is-red-2:not(.is-blue-2) span[role="slider"][aria-valuenow="2"]': {
        ...toggleRedStyles,
      },
      '&.is-red-3:not(.is-blue-3) span[role="slider"][aria-valuenow="3"]': {
        ...toggleRedStyles,
      },
      '&.is-red-4:not(.is-blue-4) span[role="slider"][aria-valuenow="4"]': {
        ...toggleRedStyles,
      },
      '&.is-red-5:not(.is-blue-5) span[role="slider"][aria-valuenow="5"]': {
        ...toggleRedStyles,
      },

      '&.is-red-1.is-blue-1 span[role="slider"]': {
        ...beforeTopLabelStyles,
        ...togglePurpleStyles,
      },
      '&.is-red-2.is-blue-2 span[role="slider"]': {
        ...togglePurpleStyles,
      },
      '&.is-red-3.is-blue-3 span[role="slider"]': {
        ...togglePurpleStyles,
      },
      '&.is-red-4.is-blue-4 span[role="slider"]': {
        ...togglePurpleStyles,
      },
      '&.is-red-5.is-blue-5 span[role="slider"]': {
        ...togglePurpleStyles,
      },

      '& span > span > span': {
        color: '#1160A8',
        fontSize: '0.8rem',
        marginBottom: -14,
        marginLeft: -4,
      },

      '&.has-after:not(.has-before)': {
        '& span > span > span': {
          color: '#A53636',
        },
      },

      '&.has-after.has-before': {
        '& span > span > span': {
          color: '#854673',
        },
      },
    },
  })
);
