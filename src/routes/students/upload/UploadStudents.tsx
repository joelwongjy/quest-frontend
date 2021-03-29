/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useReducer, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridCellClassParams,
  // GridValueFormatterParams,
} from '@material-ui/data-grid';
// import { useHistory } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import { ADD, STUDENTS } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import QuestButton from 'componentWrappers/questButton';
import { RouteState } from 'interfaces/routes/common';
import QuestAlert from 'componentWrappers/questAlert';

import { useStyles } from './uploadStudents.styles';

type UploadStudentsState = RouteState;

const UploadStudents: React.FunctionComponent = () => {
  const classes = useStyles();
  // const history = useHistory();
  // const { setHasError } = useError();

  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const excelRenderer = require('react-excel-renderer');

  const breadcrumbs = [
    { text: 'Students', href: STUDENTS },
    { text: 'Upload', href: `${STUDENTS}/${ADD}` },
  ];

  const [state, setState] = useReducer(
    (s: UploadStudentsState, a: Partial<UploadStudentsState>) => ({
      ...s,
      ...a,
    }),
    {
      isLoading: true,
      isError: false,
      isAlertOpen: false,
      alertHeader: '',
      alertMessage: '',
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

  const [selectedFile, setSelectedFile] = useState<File>();
  const [columns, setColumns] = useState<GridColDef[]>([
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 100,
      cellClassName: (params: GridCellClassParams) =>
        (params.value as string) !== 'M' && (params.value as string) !== 'F'
          ? classes.error
          : '',
    },
    {
      field: 'birthday',
      headerName: 'Birthday',
      width: 130,
      // valueFormatter: (params: GridValueFormatterParams) =>
      //   (params.value as Date).toDateString(),
    },
    { field: 'mobile', headerName: 'Mobile Number', width: 200 },
    {
      field: 'home',
      headerName: 'Home Number',
      width: 200,
      // cellClassName: (params: GridCellClassParams) =>
      //   (params.value as string).length !== 8 ? classes.error : '',
    },
    { field: 'email', headerName: 'Email', width: 200 },
  ]);
  const [rows, setRows] = useState([]);

  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setSelectedFile(fileList[0]);
    }
  };

  const handleSubmission = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('File', selectedFile);
      console.log(formData);
      excelRenderer.ExcelRenderer(selectedFile, (error: any, response: any) => {
        if (error) {
          console.log(error);
        } else {
          console.log(response.rows);
          setRows(
            response.rows.slice(1).map((row: any, index: any) => {
              return {
                id: index,
                name: row[0],
                gender: row[1],
                birthday: row[2],
                mobile: row[3],
                home: row[4],
                email: row[5],
              };
            })
          );
        }
      });
    }
  };

  // const alertCallback = getAlertCallback(setState);
  function ExportTool() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      <QuestAlert
        isAlertOpen={state.isAlertOpen!}
        hasConfirm={state.hasConfirm!}
        alertHeader={state.alertHeader!}
        alertMessage={state.alertMessage!}
        closeHandler={state.closeHandler!}
        confirmHandler={state.confirmHandler}
        cancelHandler={state.cancelHandler}
      />
      <div>
        <input type="file" name="file" onChange={fileHandler} />
        <div>
          <QuestButton onClick={handleSubmission}>Upload</QuestButton>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            components={{ Toolbar: ExportTool }}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default UploadStudents;
