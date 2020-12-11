/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import nextId from 'react-id-generator';
import { addDays } from 'date-fns';

import {
  QuestionnaireData,
  QuestionnairePostData,
} from 'interfaces/api/questionnaires';
import {
  QuestionnaireType,
  QuestionOrder,
  QuestionType,
} from 'interfaces/models/questionnaires';

export type QuestionnaireDux = QuestionnairePostData;

const initialState: QuestionnaireDux = {
  questionnaireId: -1,
  title: '',
  type: QuestionnaireType.ONE_TIME,
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
    setClasses: (state, action: PayloadAction<number[]>): void => {
      state.classes = action.payload;
    },
    setProgrammes: (state, action: PayloadAction<number[]>): void => {
      state.programmes = action.payload;
    },
    addQuestionToPre: (state): void => {
      const { length } = state.questionWindows[0].questions;
      state.questionWindows[0].questions.push({
        order: length,
        questionText: '',
        questionType: QuestionType.MULTIPLE_CHOICE,
        options: [{ optionText: '' }],
        id: parseInt(nextId().slice(2), 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        discardedAt: null,
      });
    },
    addQuestionToPost: (state): void => {
      const { length } = state.questionWindows[1].questions;
      state.questionWindows[1].questions.push({
        order: length,
        questionText: '',
        questionType: QuestionType.MULTIPLE_CHOICE,
        options: [{ optionText: '' }],
        id: parseInt(nextId().slice(2), 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        discardedAt: null,
      });
    },
    addQuestionToShared: (state): void => {
      const { length } = state.sharedQuestions.questions;
      state.sharedQuestions.questions.push({
        order: length,
        questionText: '',
        questionType: QuestionType.MULTIPLE_CHOICE,
        options: [{ optionText: '' }],
        id: parseInt(nextId().slice(2), 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        discardedAt: null,
      });
    },
    transferQuestionToPre: (
      state,
      action: PayloadAction<QuestionOrder>
    ): void => {
      const { length } = state.questionWindows[0].questions;
      state.questionWindows[0].questions.push({
        order: length,
        questionText: action.payload.questionText,
        questionType: action.payload.questionType,
        options: action.payload.options,
        id: parseInt(nextId().slice(2), 10),
        createdAt: action.payload.createdAt,
        updatedAt: new Date(),
        discardedAt: null,
      });
    },
    transferQuestionToPost: (
      state,
      action: PayloadAction<QuestionOrder>
    ): void => {
      const { length } = state.questionWindows[1].questions;
      state.questionWindows[1].questions.push({
        order: length,
        questionText: action.payload.questionText,
        questionType: action.payload.questionType,
        options: action.payload.options,
        id: parseInt(nextId().slice(2), 10),
        createdAt: action.payload.createdAt,
        updatedAt: new Date(),
        discardedAt: null,
      });
    },
    transferQuestionToShared: (
      state,
      action: PayloadAction<QuestionOrder>
    ): void => {
      const { length } = state.sharedQuestions.questions;
      state.sharedQuestions.questions.push({
        order: length,
        questionText: action.payload.questionText,
        questionType: action.payload.questionType,
        options: action.payload.options,
        id: parseInt(nextId().slice(2), 10),
        createdAt: action.payload.createdAt,
        updatedAt: new Date(),
        discardedAt: null,
      });
    },
    updateQuestionInPre: (
      state,
      action: PayloadAction<QuestionOrder>
    ): void => {
      const { order, ...question } = action.payload;
      state.questionWindows[0].questions[order] = {
        ...state.questionWindows[0].questions[order],
        ...question,
      };
    },
    updateQuestionInPost: (
      state,
      action: PayloadAction<QuestionOrder>
    ): void => {
      const { order, ...question } = action.payload;
      state.questionWindows[1].questions[order] = {
        ...state.questionWindows[1].questions[order],
        ...question,
      };
    },
    updateQuestionInShared: (
      state,
      action: PayloadAction<QuestionOrder>
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
        order: length,
        questionText: questionToDuplicate.questionText,
        questionType: questionToDuplicate.questionType,
        options: questionToDuplicate.options,
        id: parseInt(nextId().slice(2), 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        discardedAt: null,
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
        order: length,
        questionText: questionToDuplicate.questionText,
        questionType: questionToDuplicate.questionType,
        options: questionToDuplicate.options,
        id: parseInt(nextId().slice(2), 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        discardedAt: null,
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
        order: length,
        questionText: questionToDuplicate.questionText,
        questionType: questionToDuplicate.questionType,
        options: questionToDuplicate.options,
        id: parseInt(nextId().slice(2), 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        discardedAt: null,
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
      action: PayloadAction<QuestionnaireData>
    ): void => {
      state.questionnaireId = action.payload.questionnaireId;
      state.title = action.payload.title;
      state.type = action.payload.type;
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
      state.classes = action.payload.classes ?? [];
      state.programmes = action.payload.programmes ?? [];
    },
    clearQuestionnaire: (state): void => {
      state.title = '';
      state.type = QuestionnaireType.ONE_TIME;
      state.questionWindows = [
        {
          startAt: new Date(),
          endAt: new Date(),
          questions: [],
        },
      ];
      state.sharedQuestions = { questions: [] };
      state.classes = [];
      state.programmes = [];
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
  setClasses,
  setProgrammes,
  addQuestionToPre,
  addQuestionToPost,
  addQuestionToShared,
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
