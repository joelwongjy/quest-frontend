import { ClassListData } from 'interfaces/models/classes';

export interface ProgrammePostData {
  id: number;
  name: string;
  description: string;
  startAt: Date;
  endAt: Date;
  classes: ClassListData[];
}
