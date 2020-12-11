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
  mode?: 'CREATE' | 'EDIT' | 'DUPLICATE';
}

export type QuestionnaireData = QuestionnairePostData;
