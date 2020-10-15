import React, { useState } from 'react';

import { ProgrammeListData } from 'interfaces/models/programmes';
import { ClassListData } from 'interfaces/models/classes';

import {
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
} from '@material-ui/core';
import { FormatListBulletedTwoTone } from '@material-ui/icons';
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
    <FormGroup>
      {programmes.map((p) => {
        return (
          <FormGroup key={p.id}>
            <FormControlLabel
              value={p.id}
              control={<Checkbox onChange={programCallback} />}
              label={p.name}
            />
            {questClasses
              .filter((c) => c.programme.id === p.id)
              .map((c) => {
                return (
                  <FormControlLabel
                    value={c.id}
                    key={c.id}
                    control={<Checkbox onChange={classCallback} />}
                    label={c.name}
                    style={{ paddingLeft: '20px' }}
                  />
                );
              })}
          </FormGroup>
        );
      })}
    </FormGroup>
  );
};

export default ProgrammeClassPicker;
