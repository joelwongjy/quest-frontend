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
import QuestAlert from 'componentWrappers/questAlert';
import QuestDataGrid from 'componentWrappers/questDataGrid';
import { programmeColumnType } from 'componentWrappers/questDataGrid/columnTypes/programmeColumnType';
import { ADMINS, CLASSES, CREATE, EDIT } from 'constants/routes';
import { PersonData, PersonListData } from 'interfaces/models/persons';
import { RouteState } from 'interfaces/routes/common';
import ApiService from 'services/apiService';
import { getAlertCallback } from 'utils/alertUtils';

import { useStyles } from './admins.styles';

interface AdminsState extends RouteState {
  admins: PersonListData[];
  hasConfirm: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  cancelHandler: undefined | (() => void);
  selectedAdmin: PersonData | undefined;
}

const Admins: React.FunctionComponent = () => {
  const [state, setState] = useReducer(
    (s: AdminsState, a: Partial<AdminsState>) => ({
      ...s,
      ...a,
    }),
    {
      admins: [],
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
      selectedAdmin: undefined,
    }
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(`${CLASSES}${ADMINS}`);
        if (!didCancel) {
          const admins = response.data.persons as PersonListData[];
          const mappedAdmins = admins.map((x) => {
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
          setState({ admins: mappedAdmins, isLoading: false });
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

  const breadcrumbs = [{ text: 'Admins', href: ADMINS }];

  const alertCallback = getAlertCallback(setState);

  const handleEdit = async (admin: PersonData) => {
    history.push(`${ADMINS}/${admin.id}${EDIT}`);
  };

  const handleDelete = (admin: PersonData) => {
    alertCallback(
      true,
      true,
      'Are you sure?',
      'You will not be able to retrieve deleted admins.',
      () => {
        // TODO: Add error handling to deletion
        ApiService.delete(`${ADMINS}`, {
          data: {
            persons: [admin.id],
          },
        });
        const index = state.admins.indexOf(admin);
        const newAdmins = state.admins.slice();
        newAdmins.splice(index, 1);
        setState({ admins: newAdmins });
      },
      undefined
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
            to={`${ADMINS}${CREATE}`}
          >
            Create Admin
          </Button>
        }
      />
      <div className={classes.dataGrid}>
        <div style={{ flexGrow: 1 }}>
          <QuestDataGrid
            loading={state.isLoading}
            rows={state.admins}
            pageSize={20}
            autoHeight
            columns={columns}
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

export default Admins;
