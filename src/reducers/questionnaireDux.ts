/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import nextId from 'react-id-generator';
import { addDays } from 'date-fns';

import {
  QuestionnaireFullData,
  QuestionnaireStatus,
  QuestionnaireType,
  QuestionnaireWindowData,
  QuestionnaireMode,
} from 'interfaces/models/questionnaires';
import {
  OptionData,
  QuestionData,
  QuestionSetData,
  QuestionType,
} from 'interfaces/models/questions';

export interface QuestionnaireDuxOption extends Omit<OptionData, 'optionId'> {
  optionId?: number;
}

export interface QuestionnaireDuxQuestion
  extends Omit<QuestionData, 'qnOrderId' | 'options'> {
  duxId: string;
  qnOrderId?: number;
  options: QuestionnaireDuxOption[];
}

export interface QuestionnaireDuxQuestionSet
  extends Omit<QuestionSetData, 'questions'> {
  questions: QuestionnaireDuxQuestion[];
}
export interface QuestionnaireDuxWindow
  extends Omit<QuestionnaireWindowData, 'windowId' | 'questions'> {
  windowId?: number;
  questions: QuestionnaireDuxQuestion[];
}

export interface QuestionnaireDux
  extends Omit<
    QuestionnaireFullData,
    'status' | 'questionWindows' | 'sharedQuestions' | 'classes' | 'programmes'
  > {
  status?: QuestionnaireStatus;
  questionWindows: QuestionnaireDuxWindow[];
  sharedQuestions: QuestionnaireDuxQuestionSet;
  programmes: { id: number; name: string }[];
  classes: { id: number; name: string }[];
  mode: QuestionnaireMode;
}

const initialState: QuestionnaireDux = {
  questionnaireId: -1,
  title: '',
  type: QuestionnaireType.ONE_TIME,
  status: QuestionnaireStatus.DRAFT,
  questionWindows: [
    {
      startAt: new Date(),
      endAt: new Date(),
      questions: [],
    },
  ],
  sharedQuestions: {
    questions: [],
  },
  classes: [],
  programmes: [],
  mode: QuestionnaireMode.CREATE,
};

// Contains user information, theme, view selected and fun fact of the day
const questionnaire = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<QuestionnaireType>): void => {
      state.type = action.payload;
      if (action.payload === QuestionnaireType.ONE_TIME) {
        state.questionWindows = [
          {
            startAt: new Date(),
            endAt: addDays(new Date(), 7),
            questions: [],
          },
        ];
      } else {
        state.questionWindows = [
          {
            startAt: new Date(),
            endAt: addDays(new Date(), 2),
            questions: [],
          },
          {
            startAt: addDays(new Date(), 3),
            endAt: addDays(new Date(), 5),
            questions: [],
          },
        ];
      }
    },
    setTitle: (state, action: PayloadAction<string>): void => {
      state.title = action.payload;
    },
    setPreStartTime: (state, action: PayloadAction<Date>): void => {
      state.questionWindows[0].startAt = action.payload;
    },
    setPreEndTime: (state, action: PayloadAction<Date>): void => {
      state.questionWindows[0].endAt = action.payload;
    },
    setPostStartTime: (state, action: PayloadAction<Date>): void => {
      state.questionWindows[1].startAt = action.payload;
    },
    setPostEndTime: (state, action: PayloadAction<Date>): void => {
      state.questionWindows[1].endAt = action.payload;
    },
    setClasses: (
      state,
      action: PayloadAction<{ id: number; name: string }[]>
    ): void => {
      state.classes = action.payload;
    },
    setProgrammes: (
      state,
      action: PayloadAction<{ id: number; name: string }[]>
    ): void => {
      state.programmes = action.payload;
    },
    setMode: (state, action: PayloadAction<QuestionnaireMode>): void => {
      state.mode = action.payload;
    },
    addQuestionToPre: (state): void => {
      const { length } = state.questionWindows[0].questions;
      state.questionWindows[0].questions.push({
        duxId: nextId(),
        order: length,
        questionText: '',
        questionType: QuestionType.MULTIPLE_CHOICE,
        options: [{ optionText: '' }],
      });
    },
    addQuestionToPost: (state): void => {
      const { length } = state.questionWindows[1].questions;
      state.questionWindows[1].questions.push({
        duxId: nextId(),
        order: length,
        questionText: '',
        questionType: QuestionType.MULTIPLE_CHOICE,
        options: [{ optionText: '' }],
      });
    },
    addQuestionToShared: (state): void => {
      const { length } = state.sharedQuestions.questions;
      state.sharedQuestions.questions.push({
        duxId: nextId(),
        order: length,
        questionText: '',
        questionType: QuestionType.MULTIPLE_CHOICE,
        options: [{ optionText: '' }],
      });
    },
    addSampleQuestionToPre: (state, action: PayloadAction<string>): void => {
      const { length } = state.questionWindows[0].questions;
      state.questionWindows[0].questions.push({
        duxId: nextId(),
        order: length,
        questionText: action.payload,
        questionType: QuestionType.MULTIPLE_CHOICE,
        options: [{ optionText: '' }],
      });
    },
    addSampleQuestionToPost: (state, action: PayloadAction<string>): void => {
      const { length } = state.questionWindows[1].questions;
      state.questionWindows[1].questions.push({
        duxId: nextId(),
        order: length,
        questionText: action.payload,
        questionType: QuestionType.MULTIPLE_CHOICE,
        options: [{ optionText: '' }],
      });
    },
    addSampleQuestionToShared: (state, action: PayloadAction<string>): void => {
      const { length } = state.sharedQuestions.questions;
      state.sharedQuestions.questions.push({
        duxId: nextId(),
        order: length,
        questionText: action.payload,
        questionType: QuestionType.MULTIPLE_CHOICE,
        options: [{ optionText: '' }],
      });
    },
    transferQuestionToPre: (
      state,
      action: PayloadAction<QuestionnaireDuxQuestion>
    ): void => {
      const { length } = state.questionWindows[0].questions;
      state.questionWindows[0].questions.push({
        ...action.payload,
        order: length,
      });
    },
    transferQuestionToPost: (
      state,
      action: PayloadAction<QuestionnaireDuxQuestion>
    ): void => {
      const { length } = state.questionWindows[1].questions;
      state.questionWindows[1].questions.push({
        ...action.payload,
        order: length,
      });
    },
    transferQuestionToShared: (
      state,
      action: PayloadAction<QuestionnaireDuxQuestion>
    ): void => {
      const { length } = state.sharedQuestions.questions;
      state.sharedQuestions.questions.push({
        ...action.payload,
        order: length,
      });
    },
    updateQuestionInPre: (
      state,
      action: PayloadAction<QuestionnaireDuxQuestion>
    ): void => {
      const { order, ...question } = action.payload;
      state.questionWindows[0].questions[order] = {
        ...state.questionWindows[0].questions[order],
        ...question,
      };
    },
    updateQuestionInPost: (
      state,
      action: PayloadAction<QuestionnaireDuxQuestion>
    ): void => {
      const { order, ...question } = action.payload;
      state.questionWindows[1].questions[order] = {
        ...state.questionWindows[1].questions[order],
        ...question,
      };
    },
    updateQuestionInShared: (
      state,
      action: PayloadAction<QuestionnaireDuxQuestion>
    ): void => {
      const { order, ...question } = action.payload;
      state.sharedQuestions.questions[order] = {
        ...state.sharedQuestions.questions[order],
        ...question,
      };
    },
    shiftQuestionInPre: (
      state,
      action: PayloadAction<{
        direction: 'UP' | 'DOWN';
        order: number;
      }>
    ): void => {
      const { direction, order } = action.payload;
      const otherIndex = direction === 'UP' ? order - 1 : order + 1;

      if (
        otherIndex < 0 ||
        otherIndex >= state.questionWindows[0].questions.length
      ) {
        return;
      }

      const otherQuestion = state.questionWindows[0].questions[otherIndex];
      const currQuestion = state.questionWindows[0].questions[order];

      if (direction === 'UP') {
        otherQuestion.order += 1;
        currQuestion.order -= 1;
        state.questionWindows[0].questions[otherIndex] = currQuestion;
        state.questionWindows[0].questions[order] = otherQuestion;
      } else {
        otherQuestion.order -= 1;
        currQuestion.order += 1;
        state.questionWindows[0].questions[otherIndex] = currQuestion;
        state.questionWindows[0].questions[order] = otherQuestion;
      }
    },
    shiftQuestionInPost: (
      state,
      action: PayloadAction<{
        direction: 'UP' | 'DOWN';
        order: number;
      }>
    ): void => {
      const { direction, order } = action.payload;
      const otherIndex = direction === 'UP' ? order - 1 : order + 1;

      if (
        otherIndex < 0 ||
        otherIndex >= state.questionWindows[1].questions.length
      ) {
        return;
      }

      const otherQuestion = state.questionWindows[1].questions[otherIndex];
      const currQuestion = state.questionWindows[1].questions[order];

      if (direction === 'UP') {
        otherQuestion.order += 1;
        currQuestion.order -= 1;
        state.questionWindows[1].questions[otherIndex] = currQuestion;
        state.questionWindows[1].questions[order] = otherQuestion;
      } else {
        otherQuestion.order -= 1;
        currQuestion.order += 1;
        state.questionWindows[1].questions[otherIndex] = currQuestion;
        state.questionWindows[1].questions[order] = otherQuestion;
      }
    },
    shiftQuestionInShared: (
      state,
      action: PayloadAction<{
        direction: 'UP' | 'DOWN';
        order: number;
      }>
    ): void => {
      const { direction, order } = action.payload;
      const otherIndex = direction === 'UP' ? order - 1 : order + 1;

      if (
        otherIndex < 0 ||
        otherIndex >= state.sharedQuestions.questions.length
      ) {
        return;
      }

      const otherQuestion = state.sharedQuestions.questions[otherIndex];
      const currQuestion = state.sharedQuestions.questions[order];

      if (direction === 'UP') {
        otherQuestion.order += 1;
        currQuestion.order -= 1;
        state.sharedQuestions.questions[otherIndex] = currQuestion;
        state.sharedQuestions.questions[order] = otherQuestion;
      } else {
        otherQuestion.order -= 1;
        currQuestion.order += 1;
        state.sharedQuestions.questions[otherIndex] = currQuestion;
        state.sharedQuestions.questions[order] = otherQuestion;
      }
    },
    deleteQuestionInPre: (state, action: PayloadAction<number>): void => {
      const index = action.payload;
      state.questionWindows[0].questions.splice(index, 1);

      if (index < 0) {
        return;
      }

      for (
        let i = index;
        i < state.questionWindows[0].questions.length;
        i += 1
      ) {
        state.questionWindows[0].questions[i].order -= 1;
      }
    },
    deleteQuestionInPost: (state, action: PayloadAction<number>): void => {
      const index = action.payload;
      state.questionWindows[1].questions.splice(index, 1);

      if (index < 0) {
        return;
      }

      for (
        let i = index;
        i < state.questionWindows[1].questions.length;
        i += 1
      ) {
        state.questionWindows[1].questions[i].order -= 1;
      }
    },
    deleteQuestionInShared: (state, action: PayloadAction<number>): void => {
      const index = action.payload;
      state.sharedQuestions.questions.splice(index, 1);

      if (index < 0) {
        return;
      }

      for (let i = index; i < state.sharedQuestions.questions.length; i += 1) {
        state.sharedQuestions.questions[i].order -= 1;
      }
    },
    // The following three dup functions are buggy, TODO
    duplicateQuestionInPre: (state, action: PayloadAction<number>): void => {
      const index = action.payload;
      const { length } = state.questionWindows[0].questions;
      const questionToDuplicate = state.questionWindows[0].questions[index];
      state.questionWindows[0].questions.push({
        duxId: nextId(),
        order: length,
        questionText: questionToDuplicate.questionText,
        questionType: questionToDuplicate.questionType,
        options: questionToDuplicate.options,
      });

      // Bubble all the way up
      for (let i = length; i > index; i -= 1) {
        const currQuestion = state.questionWindows[0].questions[i];
        const otherQuestion = state.questionWindows[0].questions[i - 1];
        currQuestion.order -= 1;
        otherQuestion.order += 1;
        state.questionWindows[0].questions[i] = otherQuestion;
        state.questionWindows[0].questions[i - 1] = currQuestion;
      }
    },
    duplicateQuestionInPost: (state, action: PayloadAction<number>): void => {
      const index = action.payload;
      const { length } = state.questionWindows[1].questions;
      const questionToDuplicate = state.questionWindows[1].questions[index];
      state.questionWindows[1].questions.push({
        duxId: nextId(),
        order: length,
        questionText: questionToDuplicate.questionText,
        questionType: questionToDuplicate.questionType,
        options: questionToDuplicate.options,
      });

      // Bubble all the way up
      for (let i = length; i > index; i -= 1) {
        const currQuestion = state.questionWindows[1].questions[i];
        const otherQuestion = state.questionWindows[1].questions[i - 1];
        currQuestion.order -= 1;
        otherQuestion.order += 1;
        state.questionWindows[1].questions[i] = otherQuestion;
        state.questionWindows[1].questions[i - 1] = currQuestion;
      }
    },
    duplicateQuestionInShared: (state, action: PayloadAction<number>): void => {
      const index = action.payload;
      const { length } = state.sharedQuestions.questions;
      const questionToDuplicate = state.sharedQuestions.questions[index];
      state.sharedQuestions.questions.push({
        duxId: nextId(),
        order: length,
        questionText: questionToDuplicate.questionText,
        questionType: questionToDuplicate.questionType,
        options: questionToDuplicate.options,
      });

      // Bubble all the way up
      for (let i = length; i > index; i -= 1) {
        const currQuestion = state.sharedQuestions.questions[i];
        const otherQuestion = state.sharedQuestions.questions[i - 1];
        currQuestion.order -= 1;
        otherQuestion.order += 1;
        state.sharedQuestions.questions[i] = otherQuestion;
        state.sharedQuestions.questions[i - 1] = currQuestion;
      }
    },
    setQuestionnaire: (
      state,
      action: PayloadAction<QuestionnaireDux>
    ): void => {
      state.questionnaireId = action.payload.questionnaireId;
      state.title = action.payload.title;
      state.type = action.payload.type;
      state.status = action.payload.status;
      const sortedQuestionWindows = [...action.payload.questionWindows].map(
        (q) => ({
          ...q,
          questions: q.questions.sort((a, b) => a.order - b.order),
        })
      );
      state.questionWindows = [...sortedQuestionWindows];

      if (action.payload.sharedQuestions) {
        const sortedSharedQuestions = {
          questions: action.payload.sharedQuestions.questions.sort(
            (a, b) => a.order - b.order
          ),
        };
        state.sharedQuestions = {
          ...sortedSharedQuestions,
        };
      } else {
        state.sharedQuestions = { questions: [] };
      }
      state.programmes = action.payload.programmes ?? [];
      state.mode = action.payload.mode ?? QuestionnaireMode.CREATE;
    },
    clearQuestionnaire: (state): void => {
      state.questionnaireId = -1;
      state.title = '';
      state.type = QuestionnaireType.ONE_TIME;
      state.status = QuestionnaireStatus.DRAFT;
      state.questionWindows = [
        {
          startAt: new Date(),
          endAt: new Date(),
          questions: [],
        },
      ];
      state.sharedQuestions = { questions: [] };
      state.programmes = [];
      state.mode = QuestionnaireMode.CREATE;
    },
  },
});

export const {
  setType,
  setTitle,
  setPreStartTime,
  setPreEndTime,
  setPostStartTime,
  setPostEndTime,
  setProgrammes,
  setClasses,
  setMode,
  addQuestionToPre,
  addQuestionToPost,
  addQuestionToShared,
  addSampleQuestionToPre,
  addSampleQuestionToPost,
  addSampleQuestionToShared,
  transferQuestionToPre,
  transferQuestionToPost,
  transferQuestionToShared,
  duplicateQuestionInPre,
  duplicateQuestionInPost,
  duplicateQuestionInShared,
  updateQuestionInPre,
  updateQuestionInPost,
  updateQuestionInShared,
  shiftQuestionInPre,
  shiftQuestionInPost,
  shiftQuestionInShared,
  deleteQuestionInPre,
  deleteQuestionInPost,
  deleteQuestionInShared,
  setQuestionnaire,
  clearQuestionnaire,
} = questionnaire.actions;

export default questionnaire.reducer;
