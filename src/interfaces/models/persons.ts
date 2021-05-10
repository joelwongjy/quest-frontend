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
  mobileNumber?: string;
}

export interface PersonData extends PersonListData {
  // imageUrl: string // not in backend yet
  birthday?: Date | string;
  gender: Gender;
  mobileNumber?: string;
  homeNumber?: string;
  email?: string;
  highestClassRole: ClassUserRole;
  relatives: {
    person: PersonListData;
    relationship: RelationshipType;
  }[];
  programmes: {
    id: number;
    name: string;
    classes: {
      id: number;
      name: string;
      role: ClassUserRole;
    }[];
  }[];
  user?: UserData;
}
