import { subDays, addDays } from 'date-fns';

import { QuestionnaireCardInfo } from 'interfaces/components/questionnaireCard';
import QuestProgram, {
  QuestClass,
  QuestStudent,
} from 'interfaces/models/admin';

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

export const students: QuestStudent[] = [
  {
    id: 0,
    name: 'Hanming',
  },
  {
    id: 1,
    name: 'Wang Luo',
  },
];

export const classes1: QuestClass[] = [
  {
    id: 0,
    name: 'Semaphores',
    students,
  },
  {
    id: 1,
    name: 'Pipes',
    students,
  },
  {
    id: 2,
    name: 'Signals',
    students,
  },
];

export const classes2: QuestClass[] = [
  {
    id: 3,
    name: 'Buddy System',
    students,
  },
  {
    id: 4,
    name: 'Fixed Size Partitioning',
    students,
  },
  {
    id: 5,
    name: 'Dynamic Partitioning',
    students,
  },
];

export const programs: QuestProgram[] = [
  {
    id: 1,
    name: 'Synchronisation',
    classes: classes1,
  },
  {
    id: 2,
    name: 'Memory Management',
    classes: classes2,
  },
];
