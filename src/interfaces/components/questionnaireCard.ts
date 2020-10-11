export interface QuestionnaireCardInfo {
  startDate: Date;
  endDate: Date;
  lastEdited: Date;
  name: string;
  status: 'DRAFT' | 'PUBLISHED';
  id: number;
}
