import { isBefore } from 'date-fns';

import {
  QuestionnaireData,
  QuestionnairePostData,
} from 'interfaces/api/questionnaires';
import {
  OptionData,
  QuestionnaireType,
  QuestionData,
  QuestionOrder,
  QuestionSet,
  QuestionType,
  QuestionWindow,
  QuestionnaireListData,
} from 'interfaces/models/questionnaires';

/* =====================
  VALIDATION FUNCTIONS
====================== */

export const isValidQuestion = (question: QuestionOrder): boolean => {
  const { questionText, questionType, options } = question;
  if (questionText === '') {
    return false;
  }
  if (questionType === QuestionType.MULTIPLE_CHOICE) {
    return options.filter((o: OptionData) => o.optionText !== '').length >= 1;
  }
  return true;
};

export const isValidQuestionSet = (questionSet: QuestionSet): boolean => {
  const { questions } = questionSet;
  return (
    questions.every(isValidQuestion) &&
    questions
      .map((q: QuestionOrder) => q.order)
      .filter((v, i, a) => a.indexOf(v) === i).length === questions.length
  );
};

export const isValidQuestionWindow = (
  questionWindow: QuestionWindow
): boolean => {
  const { questions, startAt, endAt } = questionWindow;
  return (
    isBefore(new Date(startAt), new Date(endAt)) &&
    isValidQuestionSet({ questions })
  );
};

export const isValidQuestionnaire = (
  questionnaire: QuestionnairePostData
): boolean => {
  const { title, questionWindows, sharedQuestions } = questionnaire;
  if (questionnaire.type === QuestionnaireType.ONE_TIME) {
    return title !== '' && isValidQuestionWindow(questionWindows[0]);
  }
  if (questionnaire.type === QuestionnaireType.PRE_POST) {
    return (
      title !== '' &&
      isValidQuestionWindow(questionWindows[0]) &&
      isValidQuestionWindow(questionWindows[1]) &&
      isValidQuestionSet(sharedQuestions) &&
      isBefore(
        new Date(questionWindows[0].endAt),
        new Date(questionWindows[1].startAt)
      ) &&
      isBefore(
        new Date(questionWindows[0].endAt),
        new Date(questionWindows[1].endAt)
      )
    );
  }
  throw new Error('Unrecognised questionnaire type');
};

/* ======================
  CHECK EMPTY FUNCTIONS
======================= */

export const isEmptyQuestion = isValidQuestion;

export const isEmptyQuestionnaire = (
  questionnaire: QuestionnairePostData
): boolean => {
  const { questionWindows, sharedQuestions } = questionnaire;
  if (questionnaire.title && questionnaire.title !== '') {
    return false;
  }
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

/* =====================
  CONVERSION FUNCTIONS
====================== */

export const convertDateOfQuestionnaires = (
  questionnaires: QuestionnaireListData[]
): QuestionnaireListData[] => {
  return questionnaires.map((q: QuestionnaireListData) => ({
    ...q,
    createdAt: new Date(q.createdAt),
    startAt: new Date(q.startAt),
    endAt: new Date(q.endAt),
    updatedAt: new Date(q.updatedAt),
  }));
};

/* =====================
  SUBMISSION FUNCTIONS
====================== */

export const processCreateQuestionnaire = (
  questionnaire: QuestionnairePostData
): QuestionnairePostData => {
  return {
    ...questionnaire,
    questionWindows: questionnaire.questionWindows.map((q: QuestionWindow) => ({
      ...q,
      questions: q.questions.map((q2: QuestionOrder) => ({
        ...q2,
        options: q2.options.filter((o: OptionData) => o.optionText !== ''),
      })),
    })),
    sharedQuestions: {
      questions: questionnaire.sharedQuestions.questions.map(
        (q: QuestionOrder) => ({
          ...q,
          options: q.options.filter((o: OptionData) => o.optionText !== ''),
        })
      ),
    },
  };
};

function isSameOptions<T extends OptionData>(first: T[], second: T[]) {
  if (first.length !== second.length) {
    return false;
  }
  const firstFreq = new Map<string, number>();
  const secondFreq = new Map<string, number>();
  const insert = (entry: string, map: Map<string, number>) => {
    if (!map.has(entry)) {
      map.set(entry, 0);
    }
    map.set(entry, map.get(entry)! + 1);
  };
  first.forEach((o) => insert(o.optionText, firstFreq));
  second.forEach((o) => insert(o.optionText, secondFreq));
  let isSame = true;
  firstFreq.forEach((value, key) => {
    if (!secondFreq.has(key) || secondFreq.get(key) !== value) {
      isSame = false;
    }
  });
  return isSame;
}

function isSameQuestion<T extends QuestionData>(first: T, second: T) {
  return (
    first.questionType === second.questionType &&
    first.questionText === second.questionText &&
    isSameOptions(first.options, second.options)
  );
}

const processEditQuestionOrders = (
  questionSet: QuestionOrder[],
  original: QuestionOrder[]
): QuestionOrder[] => {
  const finalQuestionOrder: QuestionOrder[] = [];
  for (let i = 0; i < questionSet.length; i += 1) {
    const questionOrder = questionSet[i];
    if (questionOrder.qnOrderId) {
      const originalQuestionOrder = original.find(
        (q: QuestionOrder) => q.qnOrderId === questionOrder.qnOrderId
      )!;
      const isSame = isSameQuestion(questionOrder, originalQuestionOrder);
      if (!isSame) {
        questionOrder.qnOrderId = undefined;
      }
    }
    finalQuestionOrder.push(questionOrder);
  }
  return finalQuestionOrder;
};

export const processEditQuestionnaire = (
  questionnaire: QuestionnairePostData,
  original: QuestionnaireData
): QuestionnairePostData => {
  const noEmptyOptions: QuestionnairePostData = processCreateQuestionnaire(
    questionnaire
  );
  const changesIdentified: QuestionnairePostData = {
    ...noEmptyOptions,
    questionWindows: noEmptyOptions.questionWindows.map(
      (q: QuestionWindow, index: number) => ({
        ...q,
        questions: processEditQuestionOrders(
          q.questions,
          original.questionWindows[index].questions
        ),
      })
    ),
    sharedQuestions: {
      questions:
        questionnaire.type === QuestionnaireType.PRE_POST
          ? processEditQuestionOrders(
              noEmptyOptions.sharedQuestions.questions,
              original.sharedQuestions.questions
            )
          : [],
    },
  };

  return changesIdentified;
};
