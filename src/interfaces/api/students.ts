import { ActivityData } from 'interfaces/models/students';

export interface StudentPostData {
  name: string;
  gender: string;
  birthday: Date;
  mobileNumber?: string;
  homeNumber?: string;
  email?: string;
  activities: ActivityData[][];
}
