/* eslint-disable no-use-before-define */
export default interface Program {
  id: number;
  name: string;
  classes: QuestClass[];
}

export interface Student {
  id: number;
  name: string;
  classes: QuestClass[];
}

export interface QuestClass {
  id: number;
  name: string;
  role: string;
  students: Student[];
}
