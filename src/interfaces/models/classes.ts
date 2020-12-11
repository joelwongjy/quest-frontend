import { DiscardableData } from './base';
import { ClassUserRole } from './classUsers';

export interface ClassListData extends DiscardableData {
  name: string;
  role: ClassUserRole;
  programmeId: number;
}
