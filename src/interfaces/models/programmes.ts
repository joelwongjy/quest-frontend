import { DiscardableData } from './base';

export interface ProgrammeListData extends DiscardableData {
  name: string;
  description: string;
  startAt: Date;
  endAt: Date;
}

export enum ProgrammeMode {
  EDIT = 'EDIT',
  NEW = 'NEW',
}
