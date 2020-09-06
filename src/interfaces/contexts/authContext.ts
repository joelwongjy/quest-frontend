import UserContextInterface from './userContext';

export default interface AuthContextInterface {
  data: UserContextInterface | null;
  signup(username: string, password: string, name: string): Promise<void>;
  login(username: string, password: string): Promise<void>;
  logout(): Promise<void>;
}
