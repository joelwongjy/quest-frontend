import React from 'react';

import Accordion from 'components/accordion';
import ProgrammeClassPicker from 'components/programmeClassPicker';
import { UserData } from 'interfaces/models/users';

interface AssignAccordionProps {
  user: UserData;
  programmeId: number;
  classId: number;
  programmeCallback: (event: React.ChangeEvent<{ value: unknown }>) => void;
  classCallback: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const AssignAccordion: React.FC<AssignAccordionProps> = ({
  user,
  programmeId,
  classId,
  programmeCallback,
  classCallback,
}) => {
  return (
    <Accordion heading="Step 2: Assign the questionnaire">
      <ProgrammeClassPicker
        programmes={user!.programmes}
        questClasses={user!.classes}
        selectedProgrammeId={programmeId}
        selectedClassId={classId}
        programCallback={programmeCallback}
        classCallback={classCallback}
      />
    </Accordion>
  );
};

export default AssignAccordion;
