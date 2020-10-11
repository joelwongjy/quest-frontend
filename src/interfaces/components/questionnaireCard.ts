export interface Questionnaire {
  startDate: Date;
  endDate: Date;
  lastEdited: Date;
  name: string;
  status: 'DRAFT' | 'PUBLISHED';
  id: number;
}
