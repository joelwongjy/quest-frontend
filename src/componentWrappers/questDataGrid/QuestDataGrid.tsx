import React from 'react';
import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { DataGrid, DataGridProps } from '@material-ui/data-grid';

function customCheckbox(theme: Theme) {
  return {
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: `1px solid ${
        theme.palette.type === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
      }`,
      borderRadius: 2,
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#044682',
      borderColor: '#044682',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after':
      {
        width: 8,
        height: 8,
        backgroundColor: '#044682',
        transform: 'none',
        top: '39%',
        border: 0,
      },
  };
}

const defaultTheme = createMuiTheme();
const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        ...customCheckbox(theme),
      },
      button: {
        margin: theme.spacing(1.5, 0),
        color: theme.palette.primary.main,
      },
      dataGrid: {
        display: 'flex',
        height: '100%',
      },
    }),
  { defaultTheme }
);

const QuestDataGrid: React.FunctionComponent<DataGridProps> = (props) => {
  const classes = useStyles();
  return (
    <DataGrid
      className={classes.root}
      pageSize={20}
      autoHeight
      checkboxSelection
      disableSelectionOnClick
      {...props}
    />
  );
};

export default QuestDataGrid;
