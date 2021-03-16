import { AnswerPostData, AnswerData } from './answers';
import { DiscardableData } from './base';
import { QuestionnaireType, QuestionnaireWindowData } from './questionnaires';
import { UserData } from './users';

export interface AttemptPostData {
  qnnaireWindowId: number;
  answers: AnswerPostData[];
}

export interface AttemptListData extends DiscardableData {
  user: UserData;
  windowId: number;
}

export interface AttemptData {
  questionnaireWindow: QuestionnaireWindowData;
  answers: AnswerData[];
}

export interface SharedQnnaireAnswerData {
  answersBefore: AnswerData[];
  answersAfter: AnswerData[];
  sharedAnswersBefore: AnswerData[];
  sharedAnswersAfter: AnswerData[];
}

export interface AttemptFullData {
  user: UserData;
  title: string;
  type: QuestionnaireType;
  questionnaireWindow: QuestionnaireWindowData | QuestionnaireWindowData[];
  answers: AnswerData[] | SharedQnnaireAnswerData;
}
