import React from 'react';

import Accordion from 'components/accordion';
import ProgrammeClassPicker from 'components/programmeClassPicker';
import { UserData } from 'interfaces/models/users';

interface AssignAccordionProps {
  user: UserData;
  programmeIds: number[];
  classIds: number[];
  programmeCallback: (newProgrammes: number[]) => void;
  classCallback: (newClasses: number[]) => void;
}

const AssignAccordion: React.FC<AssignAccordionProps> = ({
  user,
  programmeIds,
  classIds,
  programmeCallback,
  classCallback,
}) => {
  return (
    <Accordion heading="Step 2: Assign the questionnaire">
      <ProgrammeClassPicker
        programmes={user!.programmes}
        questClasses={user!.classes}
        selectedProgrammeIds={programmeIds}
        selectedClassIds={classIds}
        programmeCallback={programmeCallback}
        classCallback={classCallback}
      />
    </Accordion>
  );
};

export default AssignAccordion;
