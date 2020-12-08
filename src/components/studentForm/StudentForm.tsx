import React, { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  List,
  ListItem,
  Select,
  MenuItem,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';

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

  const [activities, setActivities] = useState<string[]>([
    'Activity 1',
    'Activity 2',
  ]);

  const programmes = ['Programme 1', 'Programme 2'];

  const questClasses = ['Class 1', 'Class 2'];

  const updateText = (newText: string) => {
    const dummy = newText;
    dummy.replaceAll('', '');
    // dunno how to code this part but doesnt allow empty fn
  };

  const hasNameTextError = hasError && name === '';

  const renderButtons = () => {
    switch (mode) {
      case StudentMode.NEW:
        return (
          <Grid container spacing={2} justify="flex-end">
            <QuestButton className={classes.button} variant="outlined">
              Cancel
            </QuestButton>
            <QuestButton className={classes.button}>Add Student</QuestButton>
          </Grid>
        );
      case StudentMode.EDIT:
        return (
          <Grid container spacing={2} justify="flex-end">
            <QuestButton className={classes.button} variant="outlined">
              Discard Changes
            </QuestButton>
            <QuestButton className={classes.button}>Save Changes</QuestButton>
          </Grid>
        );
      default:
        return <></>;
    }
  };

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={8}>
        <QuestCard>
          <Grid item container xs={12} className={classes.header}>
            {mode === StudentMode.NEW && (
              <Typography
                component="h1"
                variant="h5"
                style={{ color: 'white' }}
              >
                Add Student Info
              </Typography>
            )}
            {mode === StudentMode.EDIT && (
              <Typography
                component="h1"
                variant="h5"
                style={{ color: 'white' }}
              >
                Edit Student Info
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <List className={classes.list}>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="h6">Student: </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <div className={classes.textfieldContainer}>
                      <FormControl
                        style={{ width: '100%' }}
                        error={hasNameTextError}
                      >
                        <QuestTextField
                          required
                          size="small"
                          className={classes.textfield}
                          label="Name"
                          variant="outlined"
                          onChange={(e) => updateText(e.target.value)}
                        />
                        {hasNameTextError && (
                          <FormHelperText>
                            The name cannot be blank!
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Typography variant="h6" className={classes.select}>
                  Activities:
                </Typography>
              </ListItem>
              {activities.map((a, index) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Grid container key={`${a}-${index}`}>
                    <ListItem>
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={4}>
                          <Typography variant="subtitle1">Programme</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <FormControl
                            variant="outlined"
                            size="small"
                            className={classes.textfieldContainer}
                          >
                            <Select
                              id="select-programmes"
                              value={programmes[0]}
                            >
                              {programmes.map((p) => {
                                return (
                                  <MenuItem value={p} key={p}>
                                    {p}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem style={{ marginBottom: '0.5rem' }}>
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={4}>
                          <Typography variant="subtitle1">Class</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <FormControl
                            variant="outlined"
                            size="small"
                            className={classes.textfieldContainer}
                          >
                            <Select
                              id="select-programmes"
                              value={questClasses[0]}
                            >
                              {questClasses.map((c) => {
                                return (
                                  <MenuItem value={c} key={c}>
                                    {c}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </Grid>
                );
              })}
              <ListItem>
                <QuestCard
                  onClick={() => {
                    const newActivities = activities.slice();
                    newActivities.push('Activity x');
                    setActivities(newActivities);
                  }}
                  className={classes.addCard}
                >
                  <AddCircleIcon className={classes.addIcon} />
                  Add an activity
                </QuestCard>
              </ListItem>
              <ListItem>{renderButtons()}</ListItem>
            </List>
          </Grid>
        </QuestCard>
      </Grid>
    </Grid>
  );
};

export default StudentForm;
