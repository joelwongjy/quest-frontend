import { isAfter, isBefore } from 'date-fns';
import { AnswerPostData } from 'interfaces/models/answers';
import { AttemptListData, AttemptPostData } from 'interfaces/models/attempts';
import { PersonData } from 'interfaces/models/persons';
import {
  QuestionnaireListData,
  QuestionnaireOneWindowData,
} from 'interfaces/models/questionnaires';
import { QuestionData, QuestionType } from 'interfaces/models/questions';

const pairQuestsWithProgrammes = (
  quests: QuestionnaireListData[],
  programmes: PersonData['programmes']
): { quest: QuestionnaireListData; programme: string }[] => {
  return quests.map((q) => {
    for (let i = 0; i < q.programmes.length; i += 1) {
      if (programmes.findIndex((p) => p.id === q.programmes[i].id) !== -1) {
        return { quest: q, programme: q.programmes[i].name };
      }
    }
    for (let i = 0; i < q.classes.length; i += 1) {
      for (let j = 0; j < programmes.length; j += 1) {
        if (
          programmes[j].classes.findIndex((c) => c.id === q.classes[i].id) !==
          -1
        ) {
          return { quest: q, programme: programmes[j].name };
        }
      }
    }
    return { quest: q, programme: '' };
  });
};

export const getNewQuests = (
  quests: QuestionnaireListData[],
  attempts: AttemptListData[],
  programmes: PersonData['programmes']
): { quest: QuestionnaireListData; programme: string }[] => {
  const openQuests = quests.filter(
    (q) =>
      isBefore(new Date(q.startAt), new Date()) &&
      isAfter(new Date(q.endAt), new Date())
  );
  const userOpenQuests = openQuests.filter(
    (q) =>
      q.programmes.some(
        (p) => programmes.findIndex((p2) => p2.id === p.id) !== -1
      ) ||
      q.classes.some(
        (c) =>
          programmes.findIndex((p) =>
            p.classes.some((c2) => c2.id === c.id)
          ) !== -1
      )
  );
  const newQuests = userOpenQuests.filter(
    (q) => attempts.findIndex((a) => a.windowId === q.windowId) === -1
  );
  return pairQuestsWithProgrammes(newQuests, programmes);
};

export const getCompletedQuests = (
  quests: QuestionnaireListData[],
  attempts: AttemptListData[],
  programmes: PersonData['programmes']
): { quest: QuestionnaireListData; programme: string }[] => {
  const completedQuests = quests.filter(
    (q) => attempts.findIndex((a) => a.windowId === q.windowId) !== -1
  );
  return pairQuestsWithProgrammes(completedQuests, programmes);
};

const isQuestionComplete = (q: QuestionData, answers: AnswerPostData[]) => {
  const answer = answers.find((a) => a.questionOrderId === q.qnOrderId);
  if (!answer) {
    return false;
  }
  if (
    q.questionType === QuestionType.LONG_ANSWER ||
    q.questionType === QuestionType.SHORT_ANSWER
  ) {
    return answer.textResponse && answer.textResponse.length > 0;
  }
  return answer.optionId && typeof answer.optionId === 'number';
};

export const isQuestComplete = (
  quest: QuestionnaireOneWindowData,
  attempt: AttemptPostData
): boolean => {
  const sharedQuestions = quest.sharedQuestions?.questions ?? undefined;
  if (sharedQuestions) {
    if (!sharedQuestions.every((q) => isQuestionComplete(q, attempt.answers))) {
      return false;
    }
  }
  return quest.questions.every((q) => isQuestionComplete(q, attempt.answers));
};
