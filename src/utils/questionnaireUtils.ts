import { isBefore } from 'date-fns';
import { v4 as uuid } from 'uuid';

import {
  QuestionnairePostData,
  QuestionnaireType,
  QuestionnaireListData,
  QuestionnaireFullData,
  QuestionnaireMode,
  QuestionnaireWindowData,
  QuestionnaireWindowPostData,
  QuestionnairePatchData,
} from 'interfaces/models/questionnaires';
import {
  OptionData,
  OptionPostData,
  QuestionData,
  QuestionPostData,
  QuestionSetData,
  QuestionSetPostData,
  QuestionType,
} from 'interfaces/models/questions';
import {
  QuestionnaireDux,
  QuestionnaireDuxOption,
  QuestionnaireDuxQuestion,
  QuestionnaireDuxWindow,
} from 'reducers/questionnaireDux';

/* =====================
  VALIDATION FUNCTIONS
====================== */

export const isValidQuestion = (
  question: QuestionData | QuestionPostData
): boolean => {
  const { questionText, questionType, options } = question;
  if (questionText === '') {
    return false;
  }
  if (questionType === QuestionType.MULTIPLE_CHOICE) {
    if (!options) {
      return false;
    }
    return (
      options.filter((o: OptionData | OptionPostData) => o.optionText !== '')
        .length >= 1
    );
  }
  return true;
};

export const isValidQuestionSet = <T extends QuestionData | QuestionPostData>(
  questionSet: QuestionSetData | QuestionSetPostData
): boolean => {
  const { questions } = questionSet;
  return (
    questions.every(isValidQuestion) &&
    (questions as T[])
      .map((q: T) => q.order)
      .filter((v, i, a) => a.indexOf(v) === i).length === questions.length
  );
};

export const isValidQuestionWindow = (
  questionWindow: QuestionnaireWindowData | QuestionnaireWindowPostData
): boolean => {
  const { questions, startAt, endAt } = questionWindow;
  return (
    isBefore(new Date(startAt), new Date(endAt)) &&
    isValidQuestionSet({ questions })
  );
};

export const isValidQuestionnaire = (
  questionnaire: QuestionnaireDux
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

export const isEmptyQuestion = (
  question: QuestionData | QuestionPostData
): boolean => {
  const { questionText, questionType, options } = question;
  if (questionText !== '') {
    return false;
  }
  if (questionType === QuestionType.MULTIPLE_CHOICE) {
    if (!options) {
      return true;
    }
    return (
      options.filter((o: OptionData | OptionPostData) => o.optionText !== '')
        .length === 0
    );
  }
  return true;
};

export const isEmptyQuestionnaire = (
  questionnaire: QuestionnaireDux
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

export const convertToQuestionnaireDux = (
  questionnaire: QuestionnaireFullData,
  mode: QuestionnaireMode
): QuestionnaireDux => {
  const result: QuestionnaireDux = {
    title: questionnaire.title,
    mode,
    type: questionnaire.type,
    questionnaireId: questionnaire.questionnaireId,
    questionWindows: questionnaire.questionWindows.map(
      (q: QuestionnaireWindowData) => ({
        ...q,
        startAt: new Date(q.startAt),
        endAt: new Date(q.endAt),
        questions: q.questions.map((q2) => ({ ...q2, duxId: uuid() })),
      })
    ),
    sharedQuestions: questionnaire.sharedQuestions
      ? {
          questions: questionnaire?.sharedQuestions?.questions.map((q) => ({
            ...q,
            duxId: uuid(),
          })),
        }
      : { questions: [] },
    programmes: questionnaire.programmes.map((p) => ({
      id: p.id,
      name: p.name,
    })),
    classes: questionnaire.classes.map((c) => ({
      id: c.id,
      name: c.name,
    })),
  };

  return result;
};

/* =====================
  SUBMISSION FUNCTIONS
====================== */

export const processCreateQuestionnaire = (
  questionnaire: QuestionnaireDux
): QuestionnairePostData => {
  return {
    ...questionnaire,
    questionWindows: questionnaire.questionWindows.map(
      (q: QuestionnaireDuxWindow) => ({
        ...q,
        startAt: new Date(q.startAt),
        endAt: new Date(q.endAt),
        questions: q.questions.map((q2) => ({
          ...q2,
          options:
            q2?.options?.filter(
              (o: OptionData | OptionPostData) => o.optionText !== ''
            ) ?? [],
        })),
      })
    ),
    sharedQuestions: {
      questions: questionnaire.sharedQuestions.questions.map(
        (q: QuestionnaireDuxQuestion) => ({
          ...q,
          options: q.options.filter(
            (o: QuestionnaireDuxOption) => o.optionText !== ''
          ),
        })
      ),
    },
    classes: questionnaire.classes.map((c) => c.id),
    programmes: questionnaire.programmes.map((c) => c.id),
  };
};

function isSameOptions<T extends OptionData | OptionPostData>(
  first: T[] | undefined,
  second: T[] | undefined
) {
  if (first === undefined && second === undefined) {
    return true;
  }
  if (first === undefined || second === undefined) {
    return false;
  }
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

function isSameQuestion<T extends QuestionData | QuestionPostData>(
  first: T,
  second: T
) {
  return (
    first.questionType === second.questionType &&
    first.questionText === second.questionText &&
    isSameOptions(first.options, second.options)
  );
}

const processEditQuestionOrders = (
  questionSet: (QuestionData | QuestionPostData)[],
  original: QuestionData[]
): (QuestionData | QuestionPostData)[] => {
  const finalQuestionOrder: (QuestionData | QuestionPostData)[] = [];
  for (let i = 0; i < questionSet.length; i += 1) {
    const questionOrder = questionSet[i];
    let pushed = false;
    if ('qnOrderId' in questionOrder) {
      const originalQuestionOrder = original.find(
        (q: QuestionData) => q.qnOrderId === questionOrder.qnOrderId
      )!;
      const isSame = isSameQuestion(questionOrder, originalQuestionOrder);
      if (!isSame) {
        const newQuestionOrder: QuestionPostData = {
          order: questionOrder.order,
          questionText: questionOrder.questionText,
          questionType: questionOrder.questionType,
          options: questionOrder.options,
        };
        finalQuestionOrder.push(newQuestionOrder);
        pushed = true;
      }
    }
    if (!pushed) {
      finalQuestionOrder.push(questionOrder);
    }
  }
  return finalQuestionOrder;
};

export const processEditQuestionnaire = (
  questionnaire: QuestionnaireDux,
  original: QuestionnaireFullData
): QuestionnairePatchData => {
  const noEmptyOptions: QuestionnairePostData = processCreateQuestionnaire(
    questionnaire
  );
  const changesIdentified: QuestionnairePatchData = {
    ...noEmptyOptions,
    questionnaireId: original.questionnaireId,
    status: original.status,
    questionWindows: noEmptyOptions.questionWindows.map(
      (q: QuestionnaireWindowPostData, index: number) => ({
        ...q,
        windowId: original.questionWindows[index].windowId,
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
              original.sharedQuestions!.questions
            )
          : [],
    },
  };

  return changesIdentified;
};
