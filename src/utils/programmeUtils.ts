import { isBefore } from 'date-fns';

import { ProgrammeFormState } from 'components/programmeForm/ProgrammeForm';

export const validateProgrammeInfo = (
  programme: ProgrammeFormState
): boolean => {
  const { name, startAt, endAt } = programme;
  return name !== '' && isBefore(startAt ?? new Date(), endAt ?? new Date());
};
