import {
  ProgrammePostData,
  ProgrammeListData,
  ProgrammePatchData,
} from 'interfaces/models/programmes';
import { ProgrammeMode } from 'interfaces/components/programmeForm';

export const programmeFormIsChanged = (
  mode: ProgrammeMode,
  state: ProgrammePostData | ProgrammePatchData,
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
