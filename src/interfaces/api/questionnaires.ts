import {
  QuestionnaireType,
  QuestionSet,
  QuestionWindow,
} from 'interfaces/models/questionnaires';

export interface QuestionnairePostData {
  title: string;
  type: QuestionnaireType;
  questionWindows: QuestionWindow[];
  // This is identical to QuestionSetPostData on the backend
  sharedQuestions: QuestionSet;
  classes?: number[];
  programmes?: number[];
}
