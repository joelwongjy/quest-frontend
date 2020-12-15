import { ClassUserRole } from 'interfaces/models/classUsers';
import { ProgrammeListData } from 'interfaces/models/programmes';

export interface ClassData {
  id: number;
  name: string;
  role: ClassUserRole;
}

export interface ClassPostData extends ClassData {
  programme: ProgrammeListData;
}
