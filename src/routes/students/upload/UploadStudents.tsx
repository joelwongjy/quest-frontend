/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useReducer, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridCellClassParams,
  GridValueFormatterParams,
} from '@material-ui/data-grid';
// import { useHistory } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import { ADD, STUDENTS } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import QuestButton from 'componentWrappers/questButton';
import { RouteState } from 'interfaces/routes/common';
import QuestAlert from 'componentWrappers/questAlert';
import { getAlertCallback } from 'utils/alertUtils';
import { useError } from 'contexts/ErrorContext';
import { isValidEmail, isValidMobileNumber } from 'utils/studentUtils';
import { PersonPostData } from 'interfaces/models/persons';

import { useStyles } from './uploadStudents.styles';

type UploadStudentsState = RouteState;

const UploadStudents: React.FunctionComponent = () => {
  const classes = useStyles();
  // const history = useHistory();
  const { hasError, setHasError } = useError();

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
  const alertCallback = getAlertCallback(setState);

  const isValidGender = (gender: string): boolean => {
    return gender === 'M' || gender === 'F';
  };

  const isValidDate = (birthday: Date): boolean => {
    return !Number.isNaN(birthday.valueOf());
  };

  const validateInfo = (
    student: Omit<PersonPostData, 'programmes'>
  ): boolean => {
    const { name, gender, birthday, mobileNumber, homeNumber, email } = student;
    return (
      name !== undefined &&
      isValidGender(gender) &&
      isValidDate(birthday) &&
      isValidMobileNumber(mobileNumber as string) &&
      isValidMobileNumber(homeNumber as string) &&
      isValidEmail(email as string)
    );
  };

  const ExcelDateToJSDate = (date: number): Date => {
    return new Date(Math.round((date - 25569) * 86400 * 1000));
  };

  // const [selectedFile, setSelectedFile] = useState<File>();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 70 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      cellClassName: (params: GridCellClassParams) =>
        params.value === undefined ? classes.error : '',
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 100,
      cellClassName: (params: GridCellClassParams) =>
        !isValidGender(params.value as string) ? classes.error : '',
    },
    {
      field: 'birthday',
      headerName: 'Birthday',
      width: 130,
      cellClassName: (params: GridCellClassParams) =>
        !isValidDate(params.value as Date) ? classes.error : '',
      valueFormatter: (params: GridValueFormatterParams) =>
        (params.value as Date).toLocaleDateString(),
    },
    {
      field: 'mobile',
      headerName: 'Mobile Number',
      width: 200,
      cellClassName: (params: GridCellClassParams) =>
        params.value !== undefined &&
        !isValidMobileNumber(params.value as string)
          ? classes.error
          : '',
    },
    {
      field: 'home',
      headerName: 'Home Number',
      width: 200,
      cellClassName: (params: GridCellClassParams) =>
        params.value !== undefined &&
        !isValidMobileNumber(params.value as string)
          ? classes.error
          : '',
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      cellClassName: (params: GridCellClassParams) =>
        params.value !== undefined && !isValidEmail(params.value as string)
          ? classes.error
          : '',
    },
  ];
  const [rows, setRows] = useState([]);

  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setHasError(false);
      const selectedFile = fileList[0];
      const formData = new FormData();
      formData.append('File', selectedFile);
      excelRenderer.ExcelRenderer(selectedFile, (error: any, response: any) => {
        if (error) {
          alertCallback(
            true,
            false,
            'Something went wrong',
            'Something went wrong with uploading the file',
            undefined,
            undefined
          );
        } else {
          setRows(
            response.rows.slice(1).map((row: any, index: any) => {
              const student = {
                id: index,
                name: row[0],
                gender: row[1],
                birthday: ExcelDateToJSDate(row[2]),
                mobile: row[3],
                home: row[4],
                email: row[5],
              };
              if (!validateInfo(student)) {
                setHasError(true);
              }
              return student;
            })
          );
        }
      });
    }
  };

  const handleSubmission = () => {
    if (hasError) {
      alertCallback(
        true,
        false,
        'Invalid data',
        'There are some errors or missing fields in the data. Please edit and try submitting again.',
        undefined,
        undefined
      );
    }
    // normal successful submission code that idk how to write
  };

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
        <div>
          <a href="/Empty.csv" download>
            <QuestButton>Download Empty Excel</QuestButton>
          </a>
        </div>
        <input
          type="file"
          name="file"
          accept=".csv, .xlsx"
          onChange={fileHandler}
        />
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            components={{ Toolbar: ExportTool }}
          />
        </div>
        <div>
          <QuestButton onClick={handleSubmission}>Submit</QuestButton>
        </div>
      </div>
    </PageContainer>
  );
};

export default UploadStudents;
