import { DiscardableData } from './base';
import { ClassListData } from './classes';
import { ProgrammeListData } from './programmes';

export enum DefaultUserRole {
  ADMIN = 'Admin',
  USER = 'User',
}

export interface ContactData {
  mobileNumber?: string;
  homeNumber?: string;
  email?: string;
}
export interface UserListData extends DiscardableData {
  username: string;
  name: string;
}

export interface UserData extends UserListData, ContactData {
  birthday?: Date;
  gender: string;
  classes: ClassListData[];
  programmes: ProgrammeListData[];
  // attempts: Attempt[];
}
