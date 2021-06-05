import { DiscardableData } from './base';
import { ClassUserRole } from './classUsers';
import { RelationshipType } from './relationships';
import { UserData } from './users';

/* ==================
  TYPES FROM BACKEND
 ================== */

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export interface PersonPostData {
  name: string;
  gender: string;
  birthday: Date;
  mobileNumber?: string;
  homeNumber?: string;
  email?: string;
  programmes: {
    id: number;
    classes: {
      id: number;
      role: ClassUserRole;
    }[];
  }[];
}

export interface PersonListData extends DiscardableData {
  name: string;
  birthday?: Date | string;
  gender?: string;
  email?: string;
  mobileNumber?: string;
  homeNumber?: string;
  programmes: {
    id: number;
    name: string;
    classes: {
      id: number;
      name: string;
      role: ClassUserRole;
    }[];
  }[];
  highestClassRole: ClassUserRole;
}

export interface PersonData extends PersonListData {
  // imageUrl: string // not in backend yet
  relatives: {
    person: PersonListData;
    relationship: RelationshipType;
  }[];
  user?: UserData;
}
