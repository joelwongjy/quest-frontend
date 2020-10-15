import { UserPostData } from 'interfaces/api/auth';
import UserContextInterface from './userContext';

export default interface AuthContextInterface {
  data: UserContextInterface | null;
  signup(data: UserPostData): Promise<void>;
  login(data: UserPostData): Promise<void>;
  logout(): Promise<void>;
}
