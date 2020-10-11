import { subDays, addDays } from 'date-fns';

import { QuestionnaireCardInfo } from 'interfaces/components/questionnaireCard';

export const questionnaires: QuestionnaireCardInfo[] = [
  {
    startDate: subDays(new Date(), 3),
    endDate: addDays(new Date(), 3),
    lastEdited: new Date(),
    name: 'Test Questionnaire',
    status: 'DRAFT',
    id: 1,
  },
  {
    startDate: addDays(new Date(), 2),
    endDate: addDays(new Date(), 3),
    lastEdited: new Date(),
    name: 'Quest Quest Quest',
    status: 'PUBLISHED',
    id: 2,
  },
  {
    startDate: subDays(new Date(), 1),
    endDate: addDays(new Date(), 15),
    lastEdited: new Date(),
    name: 'SUPER LONG NAME TESTEST TEST TESt',
    status: 'DRAFT',
    id: 3,
  },
  {
    startDate: subDays(new Date(), 10),
    endDate: subDays(new Date(), 6),
    lastEdited: new Date(),
    name: 'Trial Five',
    status: 'PUBLISHED',
    id: 4,
  },
  {
    startDate: subDays(new Date(), 10),
    endDate: addDays(new Date(), 6),
    lastEdited: new Date(),
    name: "Don't do this questionnaire!",
    status: 'DRAFT',
    id: 5,
  },
  {
    startDate: subDays(new Date(), 3),
    endDate: addDays(new Date(), 6),
    lastEdited: new Date(),
    name: 'Hahaha',
    status: 'PUBLISHED',
    id: 6,
  },
];
