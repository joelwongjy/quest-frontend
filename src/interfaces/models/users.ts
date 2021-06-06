import { DiscardableData } from './base';

export enum DefaultUserRole {
  ADMIN = 'Admin',
  USER = 'User',
}

export enum StudentMode {
  EDIT = 'EDIT',
  NEW = 'NEW',
}

export enum TeacherMode {
  EDIT = 'EDIT',
  NEW = 'NEW',
}

export enum AdminMode {
  EDIT = 'EDIT',
  NEW = 'NEW',
}

export interface UserPostData {
  username: string;
  name?: string;
  password: string | null;
  defaultUserRole?: DefaultUserRole;
}

export interface UserPatchData {
  username: string;
  name: string;
}

export interface UserListData extends DiscardableData {
  username: string;
  name: string;
  appRole: DefaultUserRole;
}

export type UserData = UserListData;
