import React from 'react';

import { ProgrammeListData } from 'interfaces/models/programmes';
import { ClassListData } from 'interfaces/models/classes';

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { useStyles } from './programmeClassPicker.styles';

export interface ProgrammeClassPickerProps {
  programmes: ProgrammeListData[];
  questClasses: ClassListData[];
  selectedProgrammeId: number;
  selectedClassId: number;
  programCallback: (event: React.ChangeEvent<{ value: unknown }>) => void;
  classCallback: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const ProgrammeClassPicker: React.FC<ProgrammeClassPickerProps> = (props) => {
  const {
    programmes,
    questClasses,
    selectedProgrammeId,
    selectedClassId,
    programCallback,
    classCallback,
  } = props;
  const classes = useStyles();

  return (
    <Grid container justify="space-around">
      <FormControl className={classes.formControl}>
        <InputLabel id="program-select-label">Program</InputLabel>
        <Select
          labelId="program-select-label"
          id="program-select"
          value={selectedProgrammeId}
          onChange={programCallback}
        >
          {programmes.map((p) => {
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
          value={selectedClassId}
          onChange={classCallback}
        >
          {questClasses
            .filter((c) => c.programme.id === selectedProgrammeId)
            .map((c) => {
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

export default ProgrammeClassPicker;
