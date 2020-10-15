/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionnairePostData } from 'interfaces/api/questionnaires';
import {
  QuestionnaireType,
  QuestionOrder,
  QuestionType,
} from 'interfaces/models/questionnaires';

export type QuestionnaireDux = QuestionnairePostData;

const initialState: QuestionnaireDux = {
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
        options: [],
        id: length,
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
        options: [],
        id: length,
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
        options: [],
        id: length,
        createdAt: new Date(),
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
      otherQuestion.order += 1;
      currQuestion.order -= 1;
      state.questionWindows[0].questions[order - 1] = currQuestion;
      state.questionWindows[0].questions[order] = otherQuestion;
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
      otherQuestion.order += 1;
      currQuestion.order -= 1;
      state.questionWindows[1].questions[order - 1] = currQuestion;
      state.questionWindows[1].questions[order] = otherQuestion;
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
      otherQuestion.order += 1;
      currQuestion.order -= 1;
      state.sharedQuestions.questions[order - 1] = currQuestion;
      state.sharedQuestions.questions[order] = otherQuestion;
    },
    clearQuestionnaire: (state): void => {
      state.type = QuestionnaireType.ONE_TIME;
      state.questionWindows = [];
      state.sharedQuestions = { questions: [] };
    },
  },
});

export const {
  setType,
  setPreStartTime,
  setPreEndTime,
  setPostStartTime,
  setPostEndTime,
  addQuestionToPre,
  addQuestionToPost,
  addQuestionToShared,
  updateQuestionInPre,
  updateQuestionInPost,
  updateQuestionInShared,
  shiftQuestionInPre,
  shiftQuestionInPost,
  shiftQuestionInShared,
  clearQuestionnaire,
} = questionnaire.actions;

export default questionnaire.reducer;
