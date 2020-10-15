import { DefaultUserRole } from 'interfaces/models/users';
import { ACCESS_TOKEN_KEY } from 'utils/tokenUtils';

export default interface LoginData {
  [ACCESS_TOKEN_KEY]: string;
}

export interface UserPostData {
  username: string;
  name?: string;
  password: string | null;
  defaultUserRole?: DefaultUserRole;
}

export interface UserPatchData {
  username: string;
  name: string;
}
