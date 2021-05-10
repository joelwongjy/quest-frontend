import { ProgrammeMode } from 'interfaces/components/programmeForm';
import {
  ProgrammeListData,
  ProgrammePatchData,
  ProgrammePostData,
} from 'interfaces/models/programmes';

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
