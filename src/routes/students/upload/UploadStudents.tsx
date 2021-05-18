/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer, useState } from 'react';
import { Button } from '@material-ui/core';
import {
  DataGrid,
  GridCellClassParams,
  GridColDef,
  GridValueFormatterParams,
} from '@material-ui/data-grid';

import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import QuestAlert from 'componentWrappers/questAlert';
import QuestButton from 'componentWrappers/questButton';
import { ADD, STUDENTS } from 'constants/routes';
import { useError } from 'contexts/ErrorContext';
import { PersonPostData } from 'interfaces/models/persons';
import { RouteState } from 'interfaces/routes/common';
import { getAlertCallback } from 'utils/alertUtils';
import { ExcelData, excelRenderer } from 'utils/excelUtils';
import { isValidEmail, isValidMobileNumber } from 'utils/studentUtils';

import { useStyles } from './uploadStudents.styles';

type UploadStudentsState = RouteState;

const UploadStudents: React.FunctionComponent = () => {
  const classes = useStyles();
  const { hasError, setHasError } = useError();

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
  const [duplicatedStudents, setDuplicatedStudents] = useState<Set<string>>(
    new Set<string>()
  );

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
      !duplicatedStudents.has(name) &&
      isValidGender(gender) &&
      isValidDate(birthday) &&
      isValidMobileNumber(mobileNumber as string) &&
      isValidMobileNumber(homeNumber as string) &&
      isValidEmail(email as string)
    );
  };

  const convertExcelDateToJSDate = (date: number): Date => {
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
        params.value === undefined ||
        duplicatedStudents.has(params.value as string)
          ? classes.error
          : '',
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
        // eslint-disable-next-line no-nested-ternary
        (params.value as Date) === undefined
          ? classes.error
          : !isValidDate(params.value as Date)
          ? classes.error
          : '',
      valueFormatter: (params: GridValueFormatterParams) =>
        (params.value as Date)?.toLocaleDateString() ?? '',
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
  const [rows, setRows] = useState<PersonPostData[]>([]);

  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setHasError(false);
      const selectedFile = fileList[0];
      const formData = new FormData();
      formData.append('File', selectedFile);
      excelRenderer(
        selectedFile,
        (error: Error | null, response: ExcelData | null) => {
          if (error || !response) {
            alertCallback(
              true,
              false,
              'Something went wrong',
              'Something went wrong with uploading the file',
              undefined,
              undefined
            );
          } else {
            const namesSet: Set<string> = new Set<string>();
            const duplicatedNamesSet: Set<string> = new Set<string>();

            setRows(
              response.rows.slice(1).map((row: any) => {
                const student: PersonPostData = {
                  name: row[0],
                  gender: row[1],
                  birthday: convertExcelDateToJSDate(row[2]),
                  mobileNumber: row[3],
                  homeNumber: row[4],
                  email: row[5],
                  programmes: [],
                };
                if (!validateInfo(student)) {
                  setHasError(true);
                }
                if (
                  namesSet.has(student.name) &&
                  !duplicatedNamesSet.has(student.name)
                ) {
                  duplicatedNamesSet.add(student.name);
                } else {
                  namesSet.add(student.name);
                }
                return student;
              })
            );
            setDuplicatedStudents(duplicatedNamesSet);
          }
        }
      );
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <div>
            <a href="/template.csv" download>
              <QuestButton style={{ margin: 0, marginRight: '1rem' }}>
                Download Empty Excel
              </QuestButton>
            </a>
          </div>
          <label htmlFor="contained-button-file">
            <input
              style={{ display: 'none' }}
              accept=".csv, .xlsx"
              id="contained-button-file"
              type="file"
              onChange={fileHandler}
            />
            <Button variant="contained" component="span">
              Upload Filled File
            </Button>
          </label>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows.map((row, id) => ({ ...row, id: id + 1 }))}
            columns={columns}
            pageSize={20}
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
