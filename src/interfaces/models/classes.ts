import { DiscardableData } from './base';
import { ClassUserRole } from './classUsers';
import { ProgrammeListData } from './programmes';

export interface ClassListData extends DiscardableData {
  name: string;
  role: ClassUserRole;
  programme: ProgrammeListData;
}
