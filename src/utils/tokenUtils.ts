import { AxiosResponse } from 'axios';

import LoginData from 'interfaces/api/login';

export const TOKEN_KEY = 'authToken';

const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

const storeToken = (response: AxiosResponse<LoginData>): Promise<null> => {
  if (response.status === 200 || response.status === 201) {
    localStorage.setItem(TOKEN_KEY, response.data[TOKEN_KEY]);
    return Promise.resolve(null);
  }
  return Promise.reject(new Error(response.statusText));
};

const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export default { getToken, storeToken, removeToken };
