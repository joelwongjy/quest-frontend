import React, { useReducer, useState } from 'react';
// import { useHistory } from 'react-router-dom';

import PageContainer from 'components/pageContainer';
import { ADD, STUDENTS } from 'constants/routes';
import PageHeader from 'components/pageHeader';
import QuestButton from 'componentWrappers/questButton';
// import { StudentMode } from 'interfaces/models/users';
// import { useError } from 'contexts/ErrorContext';
import { RouteState } from 'interfaces/routes/common';
import QuestAlert from 'componentWrappers/questAlert';
// import { getAlertCallback } from 'utils/alertUtils';
// import { useStyles } from './UploadStudents.styles';

type UploadStudentsState = RouteState;

const UploadStudents: React.FunctionComponent = () => {
  // const classes = useStyles();
  // const history = useHistory();
  // const { setHasError } = useError();

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

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setSelectedFile(fileList[0]);
    }
  };

  const handleSubmission = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('File', selectedFile);
      // eslint-disable-next-line no-console
      console.log(formData);
    }
  };

  // const alertCallback = getAlertCallback(setState);

  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} />
      {/* <StudentForm
        mode={StudentMode.NEW}
        alertCallback={alertCallback}
        cancelCallback={() => history.push(STUDENTS)}
      /> */}
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
        <input type="file" name="file" onChange={changeHandler} />
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
      </div>
    </PageContainer>
  );
};

export default UploadStudents;
