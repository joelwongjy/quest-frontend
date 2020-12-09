import React, { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  List,
  ListItem,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';

import QuestCard from 'componentWrappers/questCard';
import QuestTextField from 'componentWrappers/questTextField';
import QuestButton from 'componentWrappers/questButton';
import { ProgrammeMode } from 'interfaces/models/programmes';
import { useError } from 'contexts/ErrorContext';

import { useStyles } from './ProgrammeForm.styles';

interface ProgrammeFormProps {
  mode: ProgrammeMode;
  name: string;
}

const ProgrammeForm: React.FC<ProgrammeFormProps> = ({ mode, name }) => {
  const classes = useStyles();
  const { hasError } = useError();

  const [allClasses, setClasses] = useState<string[]>(['Class 1', 'Class 2']);

  const updateText = (newText: string) => {
    const dummy = newText;
    dummy.replaceAll('', '');
    // dunno how to code this part but doesnt allow empty fn
  };

  const hasNameTextError = hasError && name === '';

  const renderButtons = () => {
    switch (mode) {
      case ProgrammeMode.NEW:
        return (
          <Grid container spacing={2} justify="flex-end">
            <QuestButton className={classes.button} variant="outlined">
              Cancel
            </QuestButton>
            <QuestButton className={classes.button}>Add Programme</QuestButton>
          </Grid>
        );
      case ProgrammeMode.EDIT:
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
            {mode === ProgrammeMode.NEW && (
              <Typography
                component="h1"
                variant="h5"
                style={{ color: 'white' }}
              >
                Add Programme
              </Typography>
            )}
            {mode === ProgrammeMode.EDIT && (
              <Typography
                component="h1"
                variant="h5"
                style={{ color: 'white' }}
              >
                Edit Programme
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <List className={classes.list}>
              <ListItem>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">Name: </Typography>
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
                          label="Programme Name"
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
              {allClasses.map((c, index) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Grid container key={`${c}-${index}`}>
                    <ListItem>
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={4}>
                          <Typography variant="subtitle1">
                            Class {index + 1}:
                          </Typography>
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
                                label="Class Name"
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
                  </Grid>
                );
              })}
              <ListItem>
                <QuestCard
                  onClick={() => {
                    const newClasses = allClasses.slice();
                    newClasses.push('Class x');
                    setClasses(newClasses);
                  }}
                  className={classes.addCard}
                >
                  <AddCircleIcon className={classes.addIcon} />
                  Add a class
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

export default ProgrammeForm;
