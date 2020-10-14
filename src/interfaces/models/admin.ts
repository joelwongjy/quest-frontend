/* eslint-disable no-use-before-define */
export default interface QuestProgram {
  id: number;
  name: string;
  classes: QuestClass[];
}

export interface QuestStudent {
  id: number;
  name: string;
}

export interface QuestClass {
  id: number;
  name: string;
  students: QuestStudent[];
}

export interface Question {
  id: number | string;
  questionText: string;
  questionType: string;
  options: Option[];
}

export interface Option {
  id: number;
  option: string;
}
