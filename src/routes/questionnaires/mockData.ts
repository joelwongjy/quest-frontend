import { subDays, addDays } from 'date-fns';

import { Student } from 'interfaces/models/students';
import {
  QuestionnaireListData,
  QuestionnaireStatus,
  QuestionnaireType,
  QuestionSet,
  QuestionType,
} from 'interfaces/models/questionnaires';
import { ClassListData } from 'interfaces/models/classes';
import { ProgrammeListData } from 'interfaces/models/programmes';
import { DiscardableData } from 'interfaces/models/base';
import { ClassUserRole } from 'interfaces/models/classUsers';
import { QuestionnaireData } from 'interfaces/api/questionnaires';

const mockBaseData: DiscardableData = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  discardedAt: null,
};

export const questionSet: QuestionSet = {
  questions: [],
};

export const questionnaire: QuestionnaireData = {
  title: 'testing123',
  type: QuestionnaireType.ONE_TIME,
  questionWindows: [
    {
      startAt: new Date(),
      endAt: new Date(),
      questions: [
        {
          ...mockBaseData,
          id: 1,
          order: 1,
          questionText: 'i love dsc',
          questionType: QuestionType.MULTIPLE_CHOICE,
          options: [
            {
              optionText: 'nil',
            },
          ],
        },
        {
          ...mockBaseData,
          id: 2,
          order: 2,
          questionText: 'test',
          questionType: QuestionType.LONG_ANSWER,
          options: [],
        },
      ],
    },
  ],
  sharedQuestions: {
    questions: [],
  },
  classes: [1],
  programmes: [2],
};

export const questionnaires: QuestionnaireListData[] = [
  {
    ...mockBaseData,
    id: 1,
    startAt: subDays(new Date(), 3),
    endAt: addDays(new Date(), 3),
    name: 'Test Questionnaire',
    status: QuestionnaireStatus.DRAFT,
  },
  {
    ...mockBaseData,
    id: 2,
    name: 'Quest Quest Quest',
    startAt: addDays(new Date(), 2),
    endAt: addDays(new Date(), 3),
    status: QuestionnaireStatus.PUBLISHED,
  },
  {
    ...mockBaseData,
    id: 3,
    name: 'SUPER LONG NAME TESTEST TEST TESt',
    startAt: subDays(new Date(), 1),
    endAt: addDays(new Date(), 15),
    status: QuestionnaireStatus.DRAFT,
  },
  {
    ...mockBaseData,
    id: 4,
    name: 'Trial Five',
    startAt: subDays(new Date(), 10),
    endAt: subDays(new Date(), 6),
    status: QuestionnaireStatus.PUBLISHED,
  },
  {
    ...mockBaseData,
    id: 5,
    name: "Don't do this questionnaire!",
    startAt: subDays(new Date(), 10),
    endAt: addDays(new Date(), 6),
    status: QuestionnaireStatus.DRAFT,
  },
  {
    ...mockBaseData,
    id: 6,
    name: 'Hahaha',
    startAt: subDays(new Date(), 3),
    endAt: addDays(new Date(), 6),
    status: QuestionnaireStatus.PUBLISHED,
  },
];

export const students: Student[] = [
  {
    id: 0,
    name: 'Nick Fury',
    gender: 'M',
    age: 66,
  },
  {
    id: 1,
    name: 'Steve Rogers',
    gender: 'M',
    age: 93,
  },
  {
    id: 2,
    name: 'Natasha Romanoff',
    gender: 'F',
    age: 32,
  },
  {
    id: 3,
    name: 'Stephen Strange',
    gender: 'M',
    age: 41,
  },
  {
    id: 4,
    name: 'Tony Stark',
    gender: 'M',
    age: 53,
  },
];

export const programmes: ProgrammeListData[] = [
  {
    ...mockBaseData,
    id: 1,
    name: 'Synchronisation',
  },
  {
    ...mockBaseData,
    id: 2,
    name: 'Memory Management',
  },
  {
    ...mockBaseData,
    id: 3,
    name: 'Process Management',
  },
];

export const classes1: ClassListData[] = [
  {
    ...mockBaseData,
    id: 1,
    name: 'Semaphores',
    role: ClassUserRole.ADMIN,
    programme: programmes[0],
  },
  {
    ...mockBaseData,
    id: 2,
    name: 'Pipes',
    role: ClassUserRole.ADMIN,
    programme: programmes[0],
  },
  {
    ...mockBaseData,
    id: 3,
    name: 'Signals',
    role: ClassUserRole.ADMIN,
    programme: programmes[0],
  },
];

export const classes2: ClassListData[] = [
  {
    ...mockBaseData,
    id: 4,
    name: 'Buddy System',
    role: ClassUserRole.ADMIN,
    programme: programmes[0],
  },
  {
    ...mockBaseData,
    id: 5,
    name: 'Fixed Size Partitioning',
    role: ClassUserRole.ADMIN,
    programme: programmes[0],
  },
  {
    ...mockBaseData,
    id: 6,
    name: 'Dynamic Partitioning',
    role: ClassUserRole.ADMIN,
    programme: programmes[0],
  },
];
