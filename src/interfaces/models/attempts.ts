import { AnswerPostData, AnswerData } from './answers';
import { DiscardableData } from './base';
import { QuestionnaireWindowData } from './questionnaires';
import { UserData } from './users';

export interface AttemptPostData {
  qnnaireWindowId: number;
  answers: AnswerPostData[];
}

export interface AttemptListData extends DiscardableData {
  user: UserData;
  windowId: number;
}

export interface AttemptFullData {
  user: UserData;
  questionnaireWindow: QuestionnaireWindowData;
  answers?: AnswerData[];
  answersShared?: {
    sharedAnswersBefore: AnswerData[];
    sharedAnswersAfter: AnswerData[];
  };
  answersBefore?: AnswerData[];
  answersAfter?: AnswerData[];
}
