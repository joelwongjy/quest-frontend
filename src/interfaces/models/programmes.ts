import { ClassData } from 'interfaces/api/classes';
import { DiscardableData } from './base';

export interface ProgrammeListData extends DiscardableData {
  id: number;
  name: string;
  description?: string;
  startAt: Date;
  endAt: Date;
  classes: ClassData[];
}

export enum ProgrammeMode {
  EDIT = 'EDIT',
  NEW = 'NEW',
}
