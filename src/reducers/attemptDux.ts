/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AnswerPostData } from 'interfaces/models/answers';
import { AttemptPostData } from 'interfaces/models/attempts';
import { QuestionnaireOneWindowData } from 'interfaces/models/questionnaires';

export interface AttemptDux {
  quest: QuestionnaireOneWindowData | null;
  attempt: AttemptPostData | null;
  index: number;
}

const initialState: AttemptDux = {
  quest: null,
  attempt: null,
  index: 0,
};

// Contains user information, theme, view selected and fun fact of the day
const attempt = createSlice({
  name: 'attempt',
  initialState,
  reducers: {
    setAttempt: (
      state,
      action: PayloadAction<QuestionnaireOneWindowData>
    ): void => {
      state.quest = { ...action.payload };
      if (
        state.attempt === null ||
        action.payload.windowId !== state.attempt.qnnaireWindowId
      ) {
        state.attempt = {
          qnnaireWindowId: action.payload.windowId,
          answers: [],
        };
      }
      state.index = 0;
    },
    updateAnswer: (state, action: PayloadAction<AnswerPostData>): void => {
      if (!state.attempt!.answers) {
        state.attempt!.answers = [];
      }
      const index = state.attempt!.answers.findIndex(
        (a) => a.questionOrderId === action.payload.questionOrderId
      );
      if (index !== -1) {
        state.attempt!.answers[index] = { ...action.payload };
      } else {
        state.attempt!.answers = [...state.attempt!.answers, action.payload];
      }
    },
    nextQuestion: (state): void => {
      state.index = Math.min(
        state.index + 1,
        (state.quest?.sharedQuestions?.questions.length ?? 0) +
          (state.quest?.questions.length ?? 0)
      );
    },
    previousQuestion: (state): void => {
      state.index = Math.max(state.index - 1, 0);
    },
    clearAttempt: (state): void => {
      state.quest = null;
      state.attempt = null;
      state.index = 0;
    },
  },
});

export const {
  setAttempt,
  updateAnswer,
  clearAttempt,
  nextQuestion,
  previousQuestion,
} = attempt.actions;

export default attempt.reducer;
