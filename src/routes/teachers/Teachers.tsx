/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestAlert from 'componentWrappers/questAlert';
import { CLASSES, CREATE, EDIT, PROGRAMMES, TEACHERS } from 'constants/routes';
import { PersonData, PersonListData } from 'interfaces/models/persons';
import { ProgrammeListData } from 'interfaces/models/programmes';
import { RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { getAlertCallback } from 'utils/alertUtils';

import { useStyles } from './teachers.styles';

interface TeachersState extends RouteState {
  teachers: PersonListData[];
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
  selectedStudent: PersonData | undefined;
}

const Teachers: React.FunctionComponent = () => {
  const [state, setState] = useReducer(
    (s: TeachersState, a: Partial<TeachersState>) => ({
      ...s,
      ...a,
    }),
    {
      teachers: [],
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
      selectedStudent: undefined,
    }
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`${CLASSES}${TEACHERS}`);
        if (!didCancel) {
          setState({ teachers: response.data.persons, isLoading: false });
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

  const breadcrumbs = [{ text: 'Teachers', href: TEACHERS }];

  const alertCallback = getAlertCallback(setState);

  const handleEdit = async (teacher: PersonData) => {
    history.push(`${TEACHERS}/${teacher.id}${EDIT}`);
  };

  const handleDelete = (teacher: PersonData) => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'You will not be able to retrieve deleted students.',
      () => {
        // TODO: Add error handling to deletion
        ApiService.delete(`${TEACHERS}`, {
          data: {
            persons: [teacher.id],
          },
        });
        const index = state.teachers.indexOf(teacher);
        const newTeachers = state.teachers.slice();
        newTeachers.splice(index, 1);
        setState({ teachers: newTeachers });
      },
      undefined
    );
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 70 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 100,
    },
    {
      field: 'birthday',
      headerName: 'Birthday',
      width: 130,
    },
    {
      field: 'mobileNumber',
      headerName: 'Mobile Number',
      width: 200,
    },
    {
      field: 'homeNumber',
      headerName: 'Home Number',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'programmes',
      headerName: 'Programmes',
      width: 200,
      renderCell: (params: GridCellParams) =>
        params.row.programmes.map((p: ProgrammeListData) => {
          return (
            <div key={p.name}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                component={Link}
                to={`${PROGRAMMES}/${p.id}${CLASSES}`}
              >
                {p.name}
              </Button>
            </div>
          );
        }),
    },
    {
      field: '',
      headerName: 'Actions',
      sortable: false,
      // eslint-disable-next-line react/display-name
      renderCell: () => {
        return (
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
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
            to={`${TEACHERS}${CREATE}`}
          >
            Create Teacher
          </Button>
        }
      />
      <div className={classes.dataGrid}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            loading={state.isLoading}
            rows={state.teachers}
            columns={columns}
            pageSize={20}
            autoHeight
            checkboxSelection
            disableColumnMenu
            disableSelectionOnClick
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

export default Teachers;
