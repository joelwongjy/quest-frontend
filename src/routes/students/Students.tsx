/* eslint-disable react/display-name */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  createMuiTheme,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { GridCellParams, GridColDef, GridRowId } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import TablePopup from 'components/tablePopup';
import renderDefaultTablePopup from 'components/tablePopup/renderDefaultTablePopup';
import QuestAlert from 'componentWrappers/questAlert';
import QuestDataGrid from 'componentWrappers/questDataGrid';
import { CLASSES, CREATE, EDIT, PROGRAMMES, STUDENTS } from 'constants/routes';
import { PersonData, PersonListData } from 'interfaces/models/persons';
import { ProgrammeListData } from 'interfaces/models/programmes';
import { RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { getAlertCallback } from 'utils/alertUtils';

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

interface StudentsState extends RouteState {
  students: PersonListData[];
  selectedStudents: GridRowId[];
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
}

const Students: React.FunctionComponent = () => {
  const [state, setState] = useReducer(
    (s: StudentsState, a: Partial<StudentsState>) => ({
      ...s,
      ...a,
    }),
    {
      students: [],
      selectedStudents: [],
      isAlertOpen: false,
      isLoading: true,
      isError: false,
      hasConfirm: false,
      closeHandler: () => {
        setState({ isAlertOpen: false });
      },
      confirmHandler: () => {
        setState({ isAlertOpen: false });
      },
      cancelHandler: () => {
        setState({ isAlertOpen: false });
      },
    }
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`${STUDENTS}`);
        if (!didCancel) {
          setState({ students: response.data.persons, isLoading: false });
        }
      } catch (error) {
        if (!didCancel) {
          setState({
            isError: true,
            isLoading: false,
            isAlertOpen: true,
            hasConfirm: false,
            alertHeader: 'Something went wrong',
            alertMessage: 'Please refresh the page and try again',
          });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [dispatch]);

  const breadcrumbs = [{ text: 'Students', href: STUDENTS }];

  const alertCallback = getAlertCallback(setState);

  const handleSelection = (e: GridRowId[]) => {
    setState({ selectedStudents: e });
  };

  const handleEdit = async (student: PersonData) => {
    history.push(`${STUDENTS}/${student.id}${EDIT}`);
  };

  const handleDelete = (student: PersonData) => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'You will not be able to retrieve deleted students.',
      () => {
        // TODO: Add error handling to deletion
        ApiService.delete(`${STUDENTS}`, {
          data: {
            persons: [student.id],
          },
        });
        const index = state.students.indexOf(student);
        const newStudents = state.students.slice();
        newStudents.splice(index, 1);
        setState({ students: newStudents });
      },
      undefined
    );
  };

  const handleDeleteMultiple = (ids: GridRowId[]) => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'You will not be able to retrieve deleted students.',
      () => {
        let newStudents = state.students.slice();
        ApiService.delete(`${STUDENTS}`, {
          data: {
            persons: ids as number[],
          },
        });
        ids.forEach((id: GridRowId) => {
          newStudents = newStudents.filter((s: PersonListData) => {
            return s.id !== (id as number);
          });
        });
        setState({ students: newStudents });
      },
      undefined
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: renderDefaultTablePopup,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 100,
      renderCell: renderDefaultTablePopup,
    },
    {
      field: 'programmes',
      headerName: 'Programmes',
      width: 200,
      filterable: false,
      sortComparator: (v1, v2) => {
        const lhs = v1 as ProgrammeListData[];
        const rhs = v2 as ProgrammeListData[];
        if (lhs.length === 0) {
          return -1;
        }
        if (rhs.length === 0) {
          return 1;
        }
        return lhs[0].name < rhs[0].name ? -1 : 1;
      },
      renderCell: (params: GridCellParams) => {
        return (
          <TablePopup
            value={params.row.programmes
              .map((p: ProgrammeListData) => {
                return (
                  <Link key={p.id} to={`${PROGRAMMES}/${p.id}${CLASSES}`}>
                    {p.name}
                  </Link>
                );
              })
              .reduce((prev: React.ReactElement, curr: React.ReactElement) => [
                prev,
                ', ',
                curr,
              ])}
            width={params.colDef.width}
          />
        );
      },
    },
    {
      field: 'birthday',
      headerName: 'Birthday',
      width: 130,
      renderCell: renderDefaultTablePopup,
    },
    {
      field: 'mobileNumber',
      headerName: 'Mobile No.',
      width: 130,
      renderCell: renderDefaultTablePopup,
    },
    {
      field: 'homeNumber',
      headerName: 'Home No.',
      width: 130,
      renderCell: renderDefaultTablePopup,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      renderCell: renderDefaultTablePopup,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params: GridCellParams) => {
        return (
          <div>
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => handleEdit(params.row as PersonData)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(params.row as PersonData)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        breadcrumbs={breadcrumbs}
        action={
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            component={Link}
            to={`${STUDENTS}${CREATE}`}
          >
            Create Student
          </Button>
        }
      />
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => handleDeleteMultiple(state.selectedStudents)}
      >
        Delete
      </Button>
      <div className={classes.dataGrid}>
        <div style={{ flexGrow: 1 }}>
          <QuestDataGrid
            className={classes.root}
            loading={state.isLoading}
            rows={state.students}
            columns={columns}
            onSelectionModelChange={(newSelection) => {
              handleSelection(newSelection.selectionModel);
            }}
            selectionModel={state.selectedStudents}
          />
        </div>
      </div>
      <QuestAlert
        isAlertOpen={state.isAlertOpen!}
        hasConfirm={state.hasConfirm}
        alertHeader={state.alertHeader!}
        alertMessage={state.alertMessage!}
        closeHandler={state.closeHandler}
        confirmHandler={state.confirmHandler}
        cancelHandler={state.cancelHandler}
      />
    </PageContainer>
  );
};

export default Students;
