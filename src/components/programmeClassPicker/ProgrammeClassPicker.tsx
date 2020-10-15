import React from 'react';
import { FormControlLabel, FormGroup, Checkbox } from '@material-ui/core';

import { ProgrammeListData } from 'interfaces/models/programmes';
import { ClassListData } from 'interfaces/models/classes';

import { useStyles } from './programmeClassPicker.styles';

export interface ProgrammeClassPickerProps {
  programmes: ProgrammeListData[];
  questClasses: ClassListData[];
  selectedProgrammeIds: number[];
  selectedClassIds: number[];
  programmeCallback: (newProgrammes: number[]) => void;
  classCallback: (newClasses: number[]) => void;
}

const ProgrammeClassPicker: React.FC<ProgrammeClassPickerProps> = (props) => {
  const {
    programmes,
    questClasses,
    selectedProgrammeIds,
    selectedClassIds,
    programmeCallback,
    classCallback,
  } = props;
  const classes = useStyles();

  const updateState = (
    checked: boolean,
    programmeId: number,
    classId?: number
  ): void => {
    if (checked && classId === undefined) {
      const newProgrammes = [...selectedProgrammeIds, programmeId];
      const newClasses = [
        ...selectedClassIds,
        ...questClasses
          .filter((c) => c.programme.id === programmeId)
          .map((c) => c.id),
      ];
      programmeCallback(newProgrammes);
      classCallback(newClasses);
      return;
    }
    if (!checked && classId === undefined) {
      const newProgrammes = selectedProgrammeIds.filter(
        (pId) => pId !== programmeId
      );
      const newClasses = selectedClassIds
        .map((cId) => questClasses.filter((c) => c.id === cId)[0])
        .filter((c) => c.programme.id !== programmeId)
        .map((c) => c.id);

      programmeCallback(newProgrammes);
      classCallback(newClasses);
      return;
    }
    if (checked && classId) {
      const newClasses = [...selectedClassIds, classId];
      if (
        questClasses
          .filter((c) => c.programme.id === programmeId)
          .every((c) => newClasses.findIndex((x) => x === c.id) > -1)
      ) {
        const newProgrammes = [...selectedProgrammeIds, programmeId];
        programmeCallback(newProgrammes);
      }
      classCallback(newClasses);
      return;
    }
    const newClasses = selectedClassIds.filter((cId) => cId !== classId);
    const origClass = questClasses.filter((c) => c.id === classId)[0];
    const newProgrammes = selectedProgrammeIds.filter(
      (pId) => pId !== origClass.programme.id
    );
    programmeCallback(newProgrammes);
    classCallback(newClasses);
  };

  return (
    <FormGroup>
      {programmes.map((p) => {
        return (
          <FormGroup key={p.id}>
            <FormControlLabel
              value={p.id}
              control={
                <Checkbox
                  onChange={(_event, checked) => updateState(checked, p.id)}
                  checked={
                    selectedProgrammeIds.findIndex((x) => x === p.id) !== -1
                  }
                />
              }
              label={p.name}
              className={classes.formControl}
            />
            {questClasses
              .filter((c) => c.programme.id === p.id)
              .map((c) => {
                return (
                  <FormControlLabel
                    value={c.id}
                    key={c.id}
                    control={
                      <Checkbox
                        onChange={(_event, checked) =>
                          updateState(checked, p.id, c.id)
                        }
                        checked={
                          selectedClassIds.findIndex((x) => x === c.id) !== -1
                        }
                      />
                    }
                    label={c.name}
                    className={classes.formControlIndent}
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
