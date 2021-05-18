import React from 'react';

import ProgrammeClassPicker from 'components/programmeClassPicker';
import QuestAccordion from 'componentWrappers/questAccordion';
import { PersonData } from 'interfaces/models/persons';

interface AssignAccordionProps {
  user: PersonData;
  selectedProgrammes: { id: number; name: string }[];
  selectedClasses: { id: number; name: string }[];
  programmeCallback: (newProgrammes: { id: number; name: string }[]) => void;
  classCallback: (newClasses: { id: number; name: string }[]) => void;
}

const AssignAccordion: React.FC<AssignAccordionProps> = ({
  user,
  selectedProgrammes,
  selectedClasses,
  programmeCallback,
  classCallback,
}) => {
  return (
    <QuestAccordion heading="Step 2: Assign the questionnaire">
      <ProgrammeClassPicker
        programmes={user!.programmes}
        selectedClasses={selectedClasses}
        selectedProgrammes={selectedProgrammes}
        programmeCallback={programmeCallback}
        classCallback={classCallback}
      />
    </QuestAccordion>
  );
};

export default AssignAccordion;
