import {
  QuestionnaireType,
  QuestionSet,
  QuestionWindow,
} from 'interfaces/models/questionnaires';

export interface QuestionnairePostData {
  title: string;
  type: QuestionnaireType;
  questionWindows: QuestionWindow[];
  sharedQuestions: QuestionSet;
}
