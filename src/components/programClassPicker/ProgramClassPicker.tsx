import React from 'react';

import Program from 'interfaces/models/admin';

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { useStyles } from './ProgramClassPicker.styles';

export interface ProgramClassPickerProps {
  programs: Program[];
  selectedQuestProgramId: number;
  selectedQuestClassId: number;
  programCallback: (event: React.ChangeEvent<{ value: unknown }>) => void;
  questClassCallback: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const ProgramClassPicker: React.FC<ProgramClassPickerProps> = (
  props: ProgramClassPickerProps
) => {
  const {
    programs,
    selectedQuestProgramId,
    selectedQuestClassId,
    programCallback,
    questClassCallback,
  } = props;
  const classes = useStyles();

  return (
    <Grid container justify="space-around">
      <FormControl className={classes.formControl}>
        <InputLabel id="program-select-label">Program</InputLabel>
        <Select
          labelId="program-select-label"
          id="program-select"
          value={selectedQuestProgramId}
          onChange={programCallback}
        >
          {programs.map((p) => {
            return (
              <MenuItem value={p.id} key={p.id}>
                {p.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="class-select-label">Class</InputLabel>
        <Select
          labelId="program-select-label"
          id="program-select"
          value={selectedQuestClassId}
          onChange={questClassCallback}
        >
          {programs
            .find((p) => p.id === selectedQuestProgramId)
            ?.classes.map((c) => {
              return (
                <MenuItem value={c.id} key={c.id}>
                  {c.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default ProgramClassPicker;
