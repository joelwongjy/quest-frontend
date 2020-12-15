import { ProgrammeFormState } from 'components/programmeForm/ProgrammeForm';
import { ProgrammeListData, ProgrammeMode } from 'interfaces/models/programmes';

export const programmeFormIsChanged = (
  mode: ProgrammeMode,
  state: ProgrammeFormState,
  programme?: ProgrammeListData
): boolean => {
  const { name, description } = state;
  if (mode === ProgrammeMode.EDIT) {
    return (
      name !== programme!.name ||
      (description !== '' && description !== programme!.description)
    );
  }
  return name !== '' || description !== '';
};
