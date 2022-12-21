import {BACKEND_URL} from '@app/configs/settings';
import {RootState} from '@app/store';
import axios from 'axios';

import {describeErrorResponse, describeSuccessResponse} from '../logger';

const ApiClient = axios.create();

let store: {getState: () => RootState};

export const injectStore = (_store: any) => {
  store = _store;
};

ApiClient.interceptors.request.use(
  async config => {
    config.baseURL = BACKEND_URL;
    const token = store.getState().users;

    const authToken = token ? token : '';

    if (authToken) {
      config.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        ...config.headers,
      };
    }
    return config;
  },
  error => {
    describeErrorResponse(error);
    return Promise.reject(error);
  },
);

ApiClient.interceptors.response.use(
  function (response) {
    try {
      describeSuccessResponse(response);
      return response;
    } catch (error: any) {
      describeErrorResponse(error);
      return Promise.reject(error);
    }
  },
  function (error) {
    //TODO
    if (error?.response?.status === 401) {
      console.log('Token dang nhap da het han');
    }
    describeErrorResponse(error);
    return Promise.reject(error);
  },
);

export default ApiClient;
