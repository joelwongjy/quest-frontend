import {
  QuestionnaireType,
  QuestionSet,
  QuestionWindow,
} from 'interfaces/models/questionnaires';

export interface QuestionnairePostData {
  questionnaireId?: number;
  title: string;
  type: QuestionnaireType;
  questionWindows: QuestionWindow[];
  // This is identical to QuestionSetPostData on the backend
  sharedQuestions: QuestionSet;
  classes?: number[];
  programmes?: number[];
}

export type QuestionnaireData = QuestionnairePostData;
