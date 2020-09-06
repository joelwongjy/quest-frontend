import { AxiosResponse } from 'axios';

import LoginData from 'interfaces/api/login';

export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

const storeToken = (response: AxiosResponse<LoginData>): Promise<null> => {
  if (response.status === 200) {
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data[ACCESS_TOKEN_KEY]);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data[REFRESH_TOKEN_KEY]);
    return Promise.resolve(null);
  }
  return Promise.reject(new Error(response.statusText));
};

const removeToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export default { getToken: getAccessToken, storeToken, removeToken };
