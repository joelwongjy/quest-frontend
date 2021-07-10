/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import {
  GridCellParams,
  GridCellValue,
  GridColDef,
} from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import TablePopup from 'components/tablePopup';
import renderDefaultTablePopup from 'components/tablePopup/renderDefaultTablePopup';
import QuestAlert from 'componentWrappers/questAlert';
import QuestDataGrid from 'componentWrappers/questDataGrid';
import { programmeColumnType } from 'componentWrappers/questDataGrid/columnTypes/programmeColumnType';
import {
  CLASSES,
  CREATE,
  EDIT,
  HOME,
  PROGRAMMES,
  TEACHERS,
} from 'constants/routes';
import { PersonData } from 'interfaces/models/persons';
import { ProgrammeListData } from 'interfaces/models/programmes';
import { RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { getAlertCallback } from 'utils/alertUtils';

import { useStyles } from './teachers.styles';

interface TeachersState extends RouteState {
  teachers: PersonData[];
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
          const teachers = response.data.persons as PersonData[];
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
          }) as PersonData[];
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

  const breadcrumbs = [
    { text: 'Home', href: HOME },
    { text: 'Teachers', href: TEACHERS },
  ];

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
      sortComparator: (a: GridCellValue, b: GridCellValue) => {
        const aProgrammes = a as ProgrammeListData[];
        const bProgrammes = b as ProgrammeListData[];

        const aNames = aProgrammes.map((p) => p.name.toLowerCase()).join(',');
        const bNames = bProgrammes.map((p) => p.name.toLowerCase()).join(',');

        return aNames.localeCompare(bNames);
      },
      renderCell: programmeCell,
      type: 'programme',
      headerAlign: 'left',
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
            pageSize={20}
            autoHeight
            columns={columns}
            columnTypes={{ programme: programmeColumnType }}
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
