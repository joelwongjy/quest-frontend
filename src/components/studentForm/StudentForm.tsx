import React from 'react';
import { useDispatch } from 'react-redux';
import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
} from '@material-ui/core';

import PageContainer from 'components/pageContainer';
import QuestCard from 'componentWrappers/questCard';
import QuestTextField from 'componentWrappers/questTextField';
import QuestButton from 'componentWrappers/questButton';
import { StudentMode } from 'interfaces/models/students';
import { useError } from 'contexts/ErrorContext';

import { useStyles } from './StudentForm.styles';

interface StudentFormProps {
  mode: StudentMode;
  name: string;
}

const StudentForm: React.FunctionComponent<StudentFormProps> = ({
  mode,
  name,
}) => {
  const classes = useStyles();
  const { hasError } = useError();

  const updateText = (newText: string) => {
    const dummy = newText;
  };

  const hasNameTextError = hasError && name === '';

  const renderButtons = () => {
    switch (mode) {
      case StudentMode.NEW:
        return (
          <Grid container spacing={2}>
            <QuestButton>Cancel</QuestButton>
            <QuestButton>Add Student</QuestButton>
          </Grid>
        );
      case StudentMode.EDIT:
        return (
          <Grid container spacing={2}>
            <QuestButton>Discard Changes</QuestButton>
            <QuestButton>Save Changes</QuestButton>
          </Grid>
        );
      default:
        return (
          <div>
            <p> dunno what to put here</p>
          </div>
        );
    }
  };

  return (
    <PageContainer>
      <List>
        <ListItem>
          {mode === StudentMode.NEW && (
            <Typography component="h1" variant="h5">
              Add Student Info
            </Typography>
          )}
          {mode === StudentMode.EDIT && (
            <Typography component="h1" variant="h5">
              Edit Student Info
            </Typography>
          )}
        </ListItem>
        <ListItem>
          <Grid container spacing={2}>
            <Typography>Student: </Typography>
            <div className={classes.textfieldContainer}>
              <FormControl style={{ width: '100%' }} error={hasNameTextError}>
                <QuestTextField
                  required
                  className={classes.textfield}
                  label="Name"
                  variant="filled"
                  onChange={(e) => updateText(e.target.value)}
                />
                {hasNameTextError && (
                  <FormHelperText>The name cannot be blank!</FormHelperText>
                )}
              </FormControl>
            </div>
          </Grid>
        </ListItem>
        <ListItem>
          <Typography>Activities: </Typography>
        </ListItem>
        <ListItem>
          <QuestCard className={classes.addCard}>Add an activity</QuestCard>
        </ListItem>
        <ListItem>{renderButtons()}</ListItem>
      </List>
    </PageContainer>
  );
};

export default StudentForm;
