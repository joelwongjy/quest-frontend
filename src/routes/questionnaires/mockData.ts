import { subDays, addDays } from 'date-fns';

import { Student } from 'interfaces/models/students';
import {
  QuestionnaireListData,
  QuestionnaireListDataType,
  QuestionnaireStatus,
  QuestionnaireType,
  QuestionSet,
  QuestionType,
} from 'interfaces/models/questionnaires';
import { ClassListData } from 'interfaces/models/classes';
import { ProgrammeListData } from 'interfaces/models/programmes';
import { DiscardableData } from 'interfaces/models/base';
import { ClassUserRole } from 'interfaces/models/classUsers';
import { QuestionnairePostData } from 'interfaces/api/questionnaires';

const mockBaseData: DiscardableData = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  discardedAt: null,
};

export const questionSet: QuestionSet = {
  questions: [],
};

export const questionnaire: QuestionnairePostData = {
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
    type: QuestionnaireListDataType.ONE_TIME,
  },
  {
    ...mockBaseData,
    id: 2,
    name: 'Quest Quest Quest',
    startAt: addDays(new Date(), 2),
    endAt: addDays(new Date(), 3),
    status: QuestionnaireStatus.PUBLISHED,
    type: QuestionnaireListDataType.ONE_TIME,
  },
  {
    ...mockBaseData,
    id: 3,
    name: 'SUPER LONG NAME TESTEST TEST TESt',
    startAt: subDays(new Date(), 1),
    endAt: addDays(new Date(), 15),
    status: QuestionnaireStatus.DRAFT,
    type: QuestionnaireListDataType.ONE_TIME,
  },
  {
    ...mockBaseData,
    id: 4,
    name: 'Trial Five',
    startAt: subDays(new Date(), 10),
    endAt: subDays(new Date(), 6),
    status: QuestionnaireStatus.PUBLISHED,
    type: QuestionnaireListDataType.ONE_TIME,
  },
  {
    ...mockBaseData,
    id: 5,
    name: "Don't do this questionnaire!",
    startAt: addDays(new Date(), 5),
    endAt: addDays(new Date(), 10),
    status: QuestionnaireStatus.DRAFT,
    type: QuestionnaireListDataType.POST,
  },
  {
    ...mockBaseData,
    id: 5,
    name: "Don't do this questionnaire!",
    startAt: subDays(new Date(), 10),
    endAt: addDays(new Date(), 3),
    status: QuestionnaireStatus.DRAFT,
    type: QuestionnaireListDataType.PRE,
  },
  {
    ...mockBaseData,
    id: 6,
    name: 'Hahaha',
    startAt: subDays(new Date(), 3),
    endAt: addDays(new Date(), 6),
    status: QuestionnaireStatus.PUBLISHED,
    type: QuestionnaireListDataType.ONE_TIME,
  },
];

export const students: Student[] = [
  {
    id: 0,
    name: 'Nick Fury',
    gender: 'M',
    birthday: new Date(1979, 12, 12),
  },
  {
    id: 1,
    name: 'Steve Rogers',
    gender: 'M',
    birthday: new Date(1928, 12, 6),
  },
  {
    id: 2,
    name: 'Natasha Romanoff',
    gender: 'F',
    birthday: new Date(1988, 5, 12),
  },
  {
    id: 3,
    name: 'Stephen Strange',
    gender: 'M',
    birthday: new Date(1982, 5, 12),
  },
  {
    id: 4,
    name: 'Tony Stark',
    gender: 'M',
    birthday: new Date(1983, 5, 12),
  },
];

export const programmes: ProgrammeListData[] = [
  {
    ...mockBaseData,
    id: 1,
    name: 'Synchronization',
    startAt: subDays(new Date(), 3),
    endAt: addDays(new Date(), 3),
    classes: [],
  },
  {
    ...mockBaseData,
    id: 2,
    name: 'Memory Management',
    description:
      'Memory management is a form of resource management applied to computer memory.',
    startAt: subDays(new Date(), 5),
    endAt: addDays(new Date(), 10),
    classes: [],
  },
  {
    ...mockBaseData,
    id: 3,
    name: 'Process Management',
    description:
      'Process management involves various tasks like creation, scheduling, termination of processes, and a dead lock.',
    startAt: subDays(new Date(), 2),
    endAt: addDays(new Date(), 6),
    classes: [],
  },
];

export const classes1: ClassListData[] = [
  {
    ...mockBaseData,
    id: 1,
    name: 'Semaphores',
    role: ClassUserRole.ADMIN,
    programmeId: programmes[0].id,
  },
  {
    ...mockBaseData,
    id: 2,
    name: 'Pipes',
    role: ClassUserRole.ADMIN,
    programmeId: programmes[0].id,
  },
  {
    ...mockBaseData,
    id: 3,
    name: 'Signals',
    role: ClassUserRole.ADMIN,
    programmeId: programmes[0].id,
  },
];

export const classes2: ClassListData[] = [
  {
    ...mockBaseData,
    id: 4,
    name: 'Buddy System',
    role: ClassUserRole.ADMIN,
    programmeId: programmes[0].id,
  },
  {
    ...mockBaseData,
    id: 5,
    name: 'Fixed Size Partitioning',
    role: ClassUserRole.ADMIN,
    programmeId: programmes[0].id,
  },
  {
    ...mockBaseData,
    id: 6,
    name: 'Dynamic Partitioning',
    role: ClassUserRole.ADMIN,
    programmeId: programmes[0].id,
  },
];
