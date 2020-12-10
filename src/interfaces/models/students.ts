/* eslint-disable no-use-before-define */

import { ClassListData } from './classes';
import { ProgrammeListData } from './programmes';

export type ActivityData = ProgrammeListData | ClassListData;

export interface Student {
  id: number;
  name: string;
  gender: string;
  birthday: Date;
  mobileNumber?: string;
  homeNumber?: string;
  email?: string;
  activities?: ActivityData[][];
}

export enum StudentMode {
  EDIT = 'EDIT',
  NEW = 'NEW',
}
