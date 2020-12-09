/* eslint-disable no-use-before-define */

export interface Activity {
  programmeId: number;
  classId: number;
}

export interface Student {
  id: number;
  name: string;
  gender: string;
  birthday: Date;
  mobileNumber?: string;
  homeNumber?: string;
  email?: string;
  activities?: Activity[];
}

export enum StudentMode {
  EDIT = 'EDIT',
  NEW = 'NEW',
}
