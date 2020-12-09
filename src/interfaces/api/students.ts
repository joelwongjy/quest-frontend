import { Activity } from 'interfaces/models/students';

export interface StudentPostData {
  name: string;
  gender: string;
  age: number;
  mobileNumber?: string;
  homeNumber?: string;
  email?: string;
  activities: Activity[];
}
