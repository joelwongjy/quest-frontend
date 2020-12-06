/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import nextId from 'react-id-generator';

import { QuestionnairePostData } from 'interfaces/api/questionnaires';
import {
  QuestionnaireType,
  QuestionOrder,
  QuestionType,
} from 'interfaces/models/questionnaires';

export type QuestionnaireDux = QuestionnairePostData;

const initialState: QuestionnaireDux = {
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
            endAt: new Date(),
            questions: [],
          },
        ];
      } else {
        state.questionWindows = [
          {
            startAt: new Date(),
            endAt: new Date(),
            questions: [],
          },
          {
            startAt: new Date(),
            endAt: new Date(),
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
    duplicateQuestionInPre: (
      state,
      action: PayloadAction<QuestionOrder>
    ): void => {
      const { length } = state.questionWindows[0].questions;
      const index = state.questionWindows[0].questions.indexOf(action.payload);
      const dup = {
        order: length,
        questionText: action.payload.questionText,
        questionType: action.payload.questionType,
        options: action.payload.options,
        id: parseInt(nextId().slice(2), 10),
        createdAt: action.payload.createdAt,
        updatedAt: new Date(),
        discardedAt: null,
      };
      const front = state.questionWindows[0].questions.slice(0, index + 1);
      const back = state.questionWindows[0].questions.slice(index + 1);
      front.push(dup);
      back.map((q) => {
        return {
          order: q.order + 1,
          questionText: q.questionText,
          questionType: q.questionType,
          options: q.options,
          id: q.id,
          createdAt: q.createdAt,
          updatedAt: q.updatedAt,
          discardedAt: null,
        };
      });
      state.questionWindows[0].questions = front.concat(back);
    },
    duplicateQuestionInPost: (
      state,
      action: PayloadAction<QuestionOrder>
    ): void => {
      const { length } = state.questionWindows[1].questions;
      const index = state.questionWindows[1].questions.indexOf(action.payload);
      const dup = {
        order: length,
        questionText: action.payload.questionText,
        questionType: action.payload.questionType,
        options: action.payload.options,
        id: parseInt(nextId().slice(2), 10),
        createdAt: action.payload.createdAt,
        updatedAt: new Date(),
        discardedAt: null,
      };
      const front = state.questionWindows[1].questions.slice(0, index + 1);
      const back = state.questionWindows[1].questions.slice(index + 1);
      front.push(dup);
      back.map((q) => {
        return {
          order: q.order + 1,
          questionText: q.questionText,
          questionType: q.questionType,
          options: q.options,
          id: q.id,
          createdAt: q.createdAt,
          updatedAt: q.updatedAt,
          discardedAt: null,
        };
      });
      state.questionWindows[1].questions = front.concat(back);
    },
    duplicateQuestionInShared: (
      state,
      action: PayloadAction<QuestionOrder>
    ): void => {
      const { length } = state.sharedQuestions.questions;
      const index = state.sharedQuestions.questions.indexOf(action.payload);
      const dup = {
        order: length,
        questionText: action.payload.questionText,
        questionType: action.payload.questionType,
        options: action.payload.options,
        id: parseInt(nextId().slice(2), 10),
        createdAt: action.payload.createdAt,
        updatedAt: new Date(),
        discardedAt: null,
      };
      const front = state.sharedQuestions.questions.slice(0, index + 1);
      const back = state.sharedQuestions.questions.slice(index + 1);
      front.push(dup);
      back.map((q) => {
        return {
          order: q.order + 1,
          questionText: q.questionText,
          questionType: q.questionType,
          options: q.options,
          id: q.id,
          createdAt: q.createdAt,
          updatedAt: q.updatedAt,
          discardedAt: null,
        };
      });
      state.sharedQuestions.questions = front.concat(back);
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
  clearQuestionnaire,
} = questionnaire.actions;

export default questionnaire.reducer;
