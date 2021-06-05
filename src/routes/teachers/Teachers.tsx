/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import { GridCellParams, GridColDef } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import TablePopup from 'components/tablePopup';
import QuestAlert from 'componentWrappers/questAlert';
import QuestDataGrid from 'componentWrappers/questDataGrid';
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
          const teachers = response.data.persons as PersonListData[];
          const mappedTeachers = teachers.map((x) => {
            return {
              name: x.name,
              mobileNumber: x.mobileNumber ?? '-',
              homeNumber: x.homeNumber ?? '-',
              gender: x.gender ?? '-',
              birthday: x.birthday ?? '-',
              programmes: x.programmes,
              email: x.email ?? '-',
              highestClassRole: x.highestClassRole,
              discardedAt: x.discardedAt,
              id: x.id,
              createdAt: x.createdAt,
              updatedAt: x.updatedAt,
            };
          }) as PersonListData[];
          setState({ teachers: mappedTeachers, isLoading: false });
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
      'You will not be able to retrieve deleted teachers.',
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

  const programmeCell = (params: GridCellParams) => {
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
  };

  const actionCell = (params: GridCellParams) => {
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
      renderCell: programmeCell,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: actionCell,
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
          <QuestDataGrid
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
