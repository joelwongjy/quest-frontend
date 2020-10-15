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
        options: [{ optionText: '' }],
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
        options: [{ optionText: '' }],
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
    deleteQuestionInPre: (state, action: PayloadAction<number>): void => {
      state.questionWindows[0].questions.splice(action.payload, 1);
      for (
        let i = action.payload;
        i < state.questionWindows[0].questions.length;
        i += 1
      ) {
        state.questionWindows[0].questions[i].order -= 1;
      }
    },
    deleteQuestionInPost: (state, action: PayloadAction<number>): void => {
      state.questionWindows[1].questions.splice(action.payload, 1);
      for (
        let i = action.payload;
        i < state.questionWindows[1].questions.length;
        i += 1
      ) {
        state.questionWindows[1].questions[i].order -= 1;
      }
    },
    deleteQuestionInShared: (state, action: PayloadAction<number>): void => {
      state.sharedQuestions.questions.splice(action.payload, 1);
      for (
        let i = action.payload;
        i < state.sharedQuestions.questions.length;
        i += 1
      ) {
        state.sharedQuestions.questions[i].order -= 1;
      }
    },
    clearQuestionnaire: (state): void => {
      state.title = '';
      state.type = QuestionnaireType.ONE_TIME;
      state.questionWindows = [];
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
