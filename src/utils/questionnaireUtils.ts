import { isBefore } from 'date-fns';

import { QuestionnairePostData } from 'interfaces/api/questionnaires';
import {
  OptionData,
  QuestionnaireType,
  QuestionOrder,
  QuestionSet,
  QuestionType,
  QuestionWindow,
} from 'interfaces/models/questionnaires';

export const validateQuestion = (question: QuestionOrder): boolean => {
  const { questionText, questionType, options } = question;
  if (questionText === '') {
    return false;
  }
  if (questionType === QuestionType.MULTIPLE_CHOICE) {
    return options.filter((o: OptionData) => o.optionText !== '').length >= 1;
  }
  return true;
};

export const validateQuestionSet = (questionSet: QuestionSet): boolean => {
  const { questions } = questionSet;
  return (
    questions.every(validateQuestion) &&
    questions
      .map((q: QuestionOrder) => q.order)
      .filter((v, i, a) => a.indexOf(v) === i).length === questions.length
  );
};

export const validateQuestionWindow = (
  questionWindow: QuestionWindow
): boolean => {
  const { questions, startAt, endAt } = questionWindow;
  return isBefore(startAt, endAt) && validateQuestionSet({ questions });
};

export const validateQuestionnaire = (
  questionnaire: QuestionnairePostData
): boolean => {
  const { title, questionWindows, sharedQuestions } = questionnaire;
  if (questionnaire.type === QuestionnaireType.ONE_TIME) {
    return title !== '' && validateQuestionWindow(questionWindows[0]);
  }
  if (questionnaire.type === QuestionnaireType.PRE_POST) {
    return (
      title !== '' &&
      validateQuestionWindow(questionWindows[0]) &&
      validateQuestionWindow(questionWindows[1]) &&
      validateQuestionSet(sharedQuestions) &&
      isBefore(questionWindows[0].endAt, questionWindows[1].startAt) &&
      isBefore(questionWindows[0].endAt, questionWindows[1].endAt)
    );
  }
  throw new Error('Unrecognised questionnaire type');
};

export const isEmptyQuestion = (question: QuestionOrder): boolean => {
  const { questionText, questionType, options } = question;
  if (questionText === '') {
    if (questionType === QuestionType.MULTIPLE_CHOICE) {
      return (
        options.filter((o: OptionData) => o.optionText !== '').length === 0
      );
    }
    return true;
  }
  return false;
};

export const isEmptyQuestionnaire = (
  questionnaire: QuestionnairePostData
): boolean => {
  const { questionWindows, sharedQuestions } = questionnaire;
  if (questionWindows[0]) {
    if (questionWindows[0].questions.length !== 0) {
      return false;
    }
  }
  if (questionWindows[1]) {
    if (questionWindows[1].questions.length !== 0) {
      return false;
    }
  }
  if (sharedQuestions) {
    if (sharedQuestions.questions.length !== 0) {
      return false;
    }
  }
  return true;
};
