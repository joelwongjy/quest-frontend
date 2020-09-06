import store from 'app/store';
import TokenUtils from 'utils/tokenUtils';
import { setUser, clearUser } from 'reducers/miscDux';
import ApiService from 'services/apiService';
import User from 'interfaces/models/users';

const logout = (): Promise<void> => {
  TokenUtils.removeToken();
  store.dispatch(clearUser());
  return Promise.resolve();
};

const signup = async (
  username: string,
  password: string,
  name: string
): Promise<null> => {
  const response = await ApiService.post('users', {
    username,
    password,
    name,
  }).catch((error) => {
    return Promise.reject(new Error(error));
  });
  // if (response.data.message === 'Account already exists') {
  //   return Promise.reject(
  //     new Error('Account already exists! Please login instead.')
  //   );
  // }
  return TokenUtils.storeToken(response);
};

const login = async (username: string, password: string): Promise<null> => {
  const response = await ApiService.post('auth/login', {
    username,
    password,
  }).catch(() => {
    return Promise.reject(
      new Error('Invalid login credentials, please try again.')
    );
  });
  return TokenUtils.storeToken(response);
};

const getUser = async (): Promise<User | null> => {
  const token = TokenUtils.getToken();
  if (!token) {
    return Promise.resolve(null);
  }

  try {
    const response = await ApiService.get('users/self');
    if (response.status === 200) {
      const { user } = response.data;
      store.dispatch(setUser(user));
      return user;
    }
    throw new Error(response.statusText);
  } catch (error) {
    logout();
    return Promise.reject(new Error(error));
  }
};

export default {
  signup,
  login,
  logout,
  getUser,
};
