import { DiscardableData } from './base';
import { ClassListData } from './classes';

export interface ProgrammeListData extends DiscardableData {
  id: number;
  name: string;
  description?: string;
  startAt: Date;
  endAt: Date;
  classes: ClassListData[];
}

export enum ProgrammeMode {
  EDIT = 'EDIT',
  NEW = 'NEW',
}
