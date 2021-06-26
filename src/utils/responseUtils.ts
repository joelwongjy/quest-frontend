import { AnswerData } from 'interfaces/models/answers';
import {
  AttemptFullData,
  SharedQnnaireAnswerData,
} from 'interfaces/models/attempts';
import {
  QuestionnaireFullData,
  QuestionnaireType,
} from 'interfaces/models/questionnaires';
import { QuestionData } from 'interfaces/models/questions';

export const ansDataToText = (ans: AnswerData): string | undefined => {
  return ans.textResponse ? ans.textResponse : ans.option?.optionText;
};

export const constructPrePostAnswersRow = (
  questions: QuestionData[],
  answers: AnswerData[]
): (string | undefined)[] => {
  return answers.length > 0
    ? answers.map(ansDataToText)
    : questions.map(() => 'No attempt');
};

export const convertAttemptsToCsv = (
  questionnaire: QuestionnaireFullData,
  attempts: AttemptFullData[]
): (string | undefined)[][] => {
  let data: (string | undefined)[][] = [];

  if (questionnaire.type === QuestionnaireType.ONE_TIME) {
    const questions: QuestionData[] = questionnaire.questionWindows[0]
      ? questionnaire.questionWindows[0].questions
      : [];
    const headers = [
      'Student Name',
      ...questions.map((q: QuestionData) => q.questionText),
    ];
    data = [
      headers,
      ...attempts.map((a: AttemptFullData) => {
        return [
          a.user.username,
          ...(a.answers as AnswerData[]).map(ansDataToText),
        ];
      }),
    ];
  } else if (questionnaire.type === QuestionnaireType.PRE_POST) {
    const sharedQns: QuestionData[] = questionnaire.sharedQuestions
      ? questionnaire.sharedQuestions.questions
      : [];
    const beforeQns: QuestionData[] = questionnaire.questionWindows[0]
      ? questionnaire.questionWindows[0].questions
      : [];
    const afterQns: QuestionData[] = questionnaire.questionWindows[0]
      ? questionnaire.questionWindows[1].questions
      : [];
    const qns: string[] = sharedQns
      .concat(beforeQns)
      .concat(afterQns)
      .map((qns: QuestionData) => qns.questionText);

    const headers = ['Student Name', 'Before/After', ...qns];
    const answers: (string | undefined)[][] = [];

    attempts.forEach((attempt: AttemptFullData) => {
      const studentName = attempt.user.username;
      const ans: SharedQnnaireAnswerData =
        attempt.answers as SharedQnnaireAnswerData;
      answers.push([
        `${studentName} (BEFORE)`,
        'Before',
        ...constructPrePostAnswersRow(sharedQns, ans.sharedAnswersBefore),
        ...constructPrePostAnswersRow(beforeQns, ans.answersBefore),
        ...afterQns.map(() => 'NA'),
      ]);
      answers.push([
        `${studentName} (AFTER)`,
        'After',
        ...constructPrePostAnswersRow(sharedQns, ans.sharedAnswersAfter),
        ...beforeQns.map(() => 'NA'),
        ...constructPrePostAnswersRow(afterQns, ans.answersAfter),
      ]);
    });
    data = [headers, ...answers];
  }
  return data;
};
