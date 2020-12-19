import { subDays, addDays } from 'date-fns';

import {
  QuestionnaireListData,
  QuestionnaireListDataType,
  QuestionnairePostData,
  QuestionnaireStatus,
  QuestionnaireType,
} from 'interfaces/models/questionnaires';
import { DiscardableData } from 'interfaces/models/base';
import { QuestionSetData, QuestionType } from 'interfaces/models/questions';
import { PersonListData } from 'interfaces/models/persons';
import { AttemptFullData } from 'interfaces/models/attempts';
import { DefaultUserRole } from 'interfaces/models/users';

const mockBaseData: DiscardableData = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  discardedAt: null,
};

export const questionSet: QuestionSetData = {
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

export const students: PersonListData[] = [
  {
    ...mockBaseData,
    id: 0,
    name: 'Nick Fury',
  },
  {
    ...mockBaseData,
    id: 1,
    name: 'Steve Rogers',
  },
  {
    ...mockBaseData,
    id: 2,
    name: 'Natasha Romanoff',
  },
  {
    ...mockBaseData,
    id: 3,
    name: 'Stephen Strange',
  },
  {
    ...mockBaseData,
    id: 4,
    name: 'Tony Stark',
  },
];

export const attempt: AttemptFullData = {
  user: {
    username: 'johndoe',
    name: 'John Doe',
    appRole: DefaultUserRole.USER,
    discardedAt: null,
    id: 1,
    createdAt: new Date(2020, 7, 12),
    updatedAt: new Date(),
  },
  questionnaireWindow: {
    windowId: 1,
    startAt: new Date(2020, 12, 1),
    endAt: new Date(2020, 12, 12),
    questions: [
      {
        ...mockBaseData,
        order: 1,
        qnOrderId: 1,
        questionText: 'Do you want to build a snow man?',
        questionType: QuestionType.MULTIPLE_CHOICE,
        options: [
          {
            optionId: 1,
            optionText: 'Yes',
          },
          {
            optionId: 2,
            optionText: 'No',
          },
          {
            optionId: 3,
            optionText: 'Maybe',
          },
        ],
      },
      {
        ...mockBaseData,
        qnOrderId: 2,
        order: 2,
        questionText: 'I love DSC',
        questionType: QuestionType.LONG_ANSWER,
        options: [],
      },
      {
        ...mockBaseData,
        qnOrderId: 3,
        order: 3,
        questionText: 'Do you like prof ben?',
        questionType: QuestionType.SHORT_ANSWER,
        options: [],
      },
      {
        ...mockBaseData,
        qnOrderId: 4,
        order: 4,
        questionText: 'What do you think of CVWO?',
        questionType: QuestionType.MOOD,
        options: [],
      },
      {
        ...mockBaseData,
        qnOrderId: 5,
        order: 5,
        questionText: 'Rate Orbital',
        questionType: QuestionType.SCALE,
        options: [],
      },
    ],
  },
  answers: undefined,
  answersShared: {
    sharedAnswersBefore: [
      {
        answerId: 1,
        questionOrder: {
          ...mockBaseData,
          order: 1,
          qnOrderId: 1,
          questionText: 'Do you want to build a snow man?',
          questionType: QuestionType.MULTIPLE_CHOICE,
          options: [
            {
              optionId: 1,
              optionText: 'Yes',
            },
            {
              optionId: 2,
              optionText: 'No',
            },
            {
              optionId: 3,
              optionText: 'Maybe',
            },
          ],
        },
        option: {
          optionId: 2,
          optionText: 'No',
        },
      },
      {
        answerId: 2,
        questionOrder: {
          ...mockBaseData,
          qnOrderId: 2,
          order: 2,
          questionText: 'I love DSC',
          questionType: QuestionType.LONG_ANSWER,
          options: [],
        },
        textResponse: 'Dread it, run from it, destiny arrives all the same.',
      },
    ],
    sharedAnswersAfter: [
      {
        answerId: 1,
        questionOrder: {
          ...mockBaseData,
          order: 1,
          qnOrderId: 1,
          questionText: 'Do you want to build a snow man?',
          questionType: QuestionType.MULTIPLE_CHOICE,
          options: [
            {
              optionId: 1,
              optionText: 'Yes',
            },
            {
              optionId: 2,
              optionText: 'No',
            },
            {
              optionId: 3,
              optionText: 'Maybe',
            },
          ],
        },
        option: {
          optionId: 1,
          optionText: 'Yes',
        },
      },
      {
        answerId: 2,
        questionOrder: {
          ...mockBaseData,
          qnOrderId: 2,
          order: 2,
          questionText: 'I love DSC',
          questionType: QuestionType.LONG_ANSWER,
          options: [],
        },
        textResponse:
          'This universe is finite, its resources, finite... If life is left unchecked, life will cease to exist.',
      },
    ],
  },
  answersBefore: [
    {
      answerId: 3,
      questionOrder: {
        ...mockBaseData,
        qnOrderId: 3,
        order: 3,
        questionText: 'Do you like prof ben?',
        questionType: QuestionType.SHORT_ANSWER,
        options: [],
      },
      textResponse: 'Dread it, run from it, destiny arrives all the same.',
    },
  ],
  answersAfter: [
    {
      answerId: 4,
      questionOrder: {
        ...mockBaseData,
        qnOrderId: 4,
        order: 4,
        questionText: 'What do you think of CVWO?',
        questionType: QuestionType.MOOD,
        options: [],
      },
    },
    {
      answerId: 5,
      questionOrder: {
        ...mockBaseData,
        qnOrderId: 5,
        order: 5,
        questionText: 'Rate Orbital',
        questionType: QuestionType.SCALE,
        options: [],
      },
    },
  ],
};
