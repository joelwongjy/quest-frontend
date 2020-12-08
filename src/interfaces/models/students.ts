/* eslint-disable no-use-before-define */

export interface Student {
  id: number;
  name: string;
  gender: string;
  age: number;
}

export enum StudentMode {
  EDIT = 'EDIT',
  NEW = 'NEW',
}
