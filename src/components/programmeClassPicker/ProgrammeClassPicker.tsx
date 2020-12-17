import React from 'react';
import { FormControlLabel, FormGroup, Checkbox } from '@material-ui/core';

import { PersonData } from 'interfaces/models/persons';

import { useStyles } from './programmeClassPicker.styles';

export interface ProgrammeClassPickerProps {
  programmes: PersonData['programmes'];
  selectedProgrammes: { id: number; name: string }[];
  selectedClasses: { id: number; name: string }[];
  programmeCallback: (newProgrammes: { id: number; name: string }[]) => void;
  classCallback: (newClasses: { id: number; name: string }[]) => void;
}

const ProgrammeClassPicker: React.FC<ProgrammeClassPickerProps> = (props) => {
  const {
    programmes,
    selectedProgrammes,
    selectedClasses,
    programmeCallback,
    classCallback,
  } = props;
  const classes = useStyles();

  const updateState = (
    checked: boolean,
    programme: { id: number; name: string },
    _class?: { id: number; name: string }
  ): void => {
    if (checked && !_class) {
      const newProgrammes = [...selectedProgrammes, programme];
      const newClasses = [
        ...selectedClasses,
        ...programmes
          .find((p) => p.id === programme.id)!
          .classes.map((c) => ({ id: c.id, name: c.name })),
      ];
      programmeCallback(newProgrammes);
      classCallback(newClasses);
      return;
    }
    if (!checked && !_class) {
      const newProgrammes = selectedProgrammes.filter(
        (p) => p.id !== programme.id
      );
      const removedProgramme = programmes.find((p) => p.id === programme.id)!;
      const newClasses = selectedClasses.filter(
        (c) => removedProgramme.classes.findIndex((c2) => c.id === c2.id) === -1
      );
      programmeCallback(newProgrammes);
      classCallback(newClasses);
      return;
    }
    if (checked && _class) {
      const newClasses = [...selectedClasses, _class];
      if (
        programmes
          .find((p) => p.id === programme.id)!
          .classes.every((c) => newClasses.findIndex((x) => x.id === c.id) > -1)
      ) {
        const newProgrammes = [...selectedProgrammes, programme];
        programmeCallback(newProgrammes);
      }
      classCallback(newClasses);
      return;
    }
    const newClasses = selectedClasses.filter((c) => c.id !== _class!.id);
    const newProgrammes = programmes
      .filter((p) =>
        p.classes.some(
          (c) => newClasses.findIndex((c2) => c2.id === c.id) !== -1
        )
      )
      .map((p) => ({ id: p.id, name: p.name }));
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
                  onChange={(_event, checked) => updateState(checked, p)}
                  checked={
                    selectedProgrammes.findIndex((x) => x.id === p.id) !== -1
                  }
                />
              }
              label={p.name}
              className={classes.formControl}
            />
            {p.classes.map((c) => {
              return (
                <FormControlLabel
                  value={c.id}
                  key={c.id}
                  control={
                    <Checkbox
                      onChange={(_event, checked) => updateState(checked, p, c)}
                      checked={
                        selectedClasses.findIndex((x) => x.id === c.id) !== -1
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
