/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
// import { useHistory } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import { ADD, STUDENTS } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import QuestButton from 'componentWrappers/questButton';
import { RouteState } from 'interfaces/routes/common';
import QuestAlert from 'componentWrappers/questAlert';

type UploadStudentsState = RouteState;

const UploadStudents: React.FunctionComponent = () => {
  // const classes = useStyles();
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
  const [columns, setColumns] = useState([
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'gender', headerName: 'Gender', width: 70 },
    { field: 'birthday', headerName: 'Birthday', type: 'date', width: 130 },
    { field: 'mobile', headerName: 'Mobile Number', width: 130 },
    { field: 'home', headerName: 'Home Number', width: 130 },
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
          <Link to="/BlankTemplate.xlsx" target="_blank" download>
            Download Template Excel
          </Link>
        </div>
        <input type="file" name="file" onChange={fileHandler} />
        {selectedFile ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <QuestButton onClick={handleSubmission}>Submit</QuestButton>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          {/* <excelRenderer.OutTable
            data={rows}
            columns={columns}
            tableClassName="ExcelTable2007"
            tableHeaderRowClass="heading"
          /> */}
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </div>
    </PageContainer>
  );
};

export default UploadStudents;
