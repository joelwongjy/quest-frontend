/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AttemptPostData } from 'interfaces/models/attempts';
import { AnswerPostData } from 'interfaces/models/answers';
import { QuestionnaireOneWindowData } from 'interfaces/models/questionnaires';

export interface AttemptDux {
  quest: QuestionnaireOneWindowData | null;
  attempt: AttemptPostData | null;
}

const initialState: AttemptDux = {
  quest: null,
  attempt: null,
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
      state.attempt = {
        qnnaireWindowId: action.payload.windowId,
        answers: [],
      };
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
    clearAttempt: (state): void => {
      state.quest = null;
      state.attempt = null;
    },
  },
});

export const { setAttempt, updateAnswer, clearAttempt } = attempt.actions;

export default attempt.reducer;
