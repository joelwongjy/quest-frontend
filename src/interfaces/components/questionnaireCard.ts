export interface QuestionnaireCardInfo {
  startDate: Date;
  endDate: Date;
  lastEdited: Date;
  name: string;
  status: 'DRAFT' | 'PUBLISHED';
  id: number;
}

export interface MenuOption {
  text: string;
  callback: () => void;
}
