import { DiscardableData } from './base';
import { ClassListData } from './classes';

// PATCH /programmes/:programmeId
export interface ProgrammePatchData {
  name?: string;
  description?: string;
  classes?: {
    id?: number;
    name?: string;
    description?: string;
  }[];
}

// POST /programmes/create
export interface ProgrammePostData {
  name: string;
  description?: string;
}

// GET /programmes
export interface ProgrammeListData extends DiscardableData {
  name: string;
  classCount: number;
  description?: string;
}

// GET /programmes/:programmeId
export interface ProgrammeData extends ProgrammeListData {
  classes: ClassListData[];
  studentCount: number; // unique students
  teacherCount: number; // unique teachers
}
