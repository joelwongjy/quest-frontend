import { addDays, subDays } from 'date-fns';

import { DiscardableData } from 'interfaces/models/base';
import {
  QuestionnaireListData,
  QuestionnaireListDataType,
  QuestionnairePostData,
  QuestionnaireStatus,
  QuestionnaireType,
} from 'interfaces/models/questionnaires';
import { QuestionSetData, QuestionType } from 'interfaces/models/questions';

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
          questionText: 'I love DSC',
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
    windowId: 1,
    startAt: subDays(new Date(), 3),
    endAt: addDays(new Date(), 3),
    name: 'Test Questionnaire',
    status: QuestionnaireStatus.DRAFT,
    type: QuestionnaireListDataType.ONE_TIME,
    programmes: [],
    classes: [],
  },
  {
    ...mockBaseData,
    id: 2,
    windowId: 2,
    name: 'Quest Quest Quest',
    startAt: addDays(new Date(), 2),
    endAt: addDays(new Date(), 3),
    status: QuestionnaireStatus.PUBLISHED,
    type: QuestionnaireListDataType.ONE_TIME,
    programmes: [],
    classes: [],
  },
  {
    ...mockBaseData,
    id: 3,
    windowId: 3,
    name: 'SUPER LONG NAME TESTEST TEST TESt',
    startAt: subDays(new Date(), 1),
    endAt: addDays(new Date(), 15),
    status: QuestionnaireStatus.DRAFT,
    type: QuestionnaireListDataType.ONE_TIME,
    programmes: [],
    classes: [],
  },
  {
    ...mockBaseData,
    id: 4,
    windowId: 4,
    name: 'Trial Five',
    startAt: subDays(new Date(), 10),
    endAt: subDays(new Date(), 6),
    status: QuestionnaireStatus.PUBLISHED,
    type: QuestionnaireListDataType.ONE_TIME,
    programmes: [],
    classes: [],
  },
  {
    ...mockBaseData,
    id: 5,
    windowId: 6,
    name: "Don't do this questionnaire!",
    startAt: addDays(new Date(), 5),
    endAt: addDays(new Date(), 10),
    status: QuestionnaireStatus.DRAFT,
    type: QuestionnaireListDataType.POST,
    programmes: [],
    classes: [],
  },
  {
    ...mockBaseData,
    id: 5,
    windowId: 5,
    name: "Don't do this questionnaire!",
    startAt: subDays(new Date(), 10),
    endAt: addDays(new Date(), 3),
    status: QuestionnaireStatus.DRAFT,
    type: QuestionnaireListDataType.PRE,
    programmes: [],
    classes: [],
  },
  {
    ...mockBaseData,
    id: 6,
    windowId: 7,
    name: 'Hahaha',
    startAt: subDays(new Date(), 3),
    endAt: addDays(new Date(), 6),
    status: QuestionnaireStatus.PUBLISHED,
    type: QuestionnaireListDataType.ONE_TIME,
    programmes: [],
    classes: [],
  },
];
