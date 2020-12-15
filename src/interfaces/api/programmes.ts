import { ClassData } from './classes';

export interface ProgrammePostData {
  id: number;
  name: string;
  description?: string;
  classes: ClassData[];
}
