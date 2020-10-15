import {
  QuestionnaireType,
  QuestionSet,
  QuestionWindow,
} from 'interfaces/models/questionnaires';

export interface QuestionnairePostData {
  type: QuestionnaireType;
  questionWindows: QuestionWindow[];
  sharedQuestions: QuestionSet;
}
