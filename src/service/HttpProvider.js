import axios from 'axios';
import { authClass } from '../utils/auth.util';

const BASE_URL = 'https://p-post.herokuapp.com/api/v1/';
// const BASE_URL = 'http://52.29.184.31:3008/api/v1/';

export async function getApiRequestHeader() {
  const user = authClass.getUser;

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user ? user.token : ''}`
  };
}

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  withCredentials: false
});

export async function updateHeaders() {
  const header = await getApiRequestHeader();
  instance.defaults.headers = header;
}

export async function request({ method, url, data, headers }) {
  if (headers === undefined) {
    await updateHeaders();
  }

  const promise = instance[method](url, data);
  let response;
  try {
    response = await promise;
  } catch (error) {
    if (error.response) {
      throw Object.assign({}, new Error('Error.'), {
        response: error.response
      });
    }
    throw Object.assign({}, new Error('Error.'), {
      response: { data: { message: error.toString() } }
    });
  }

  if (
    response.data.status
      ? response.data.status.toString().indexOf('2') !== 0
      : response.status.toString().indexOf('2') !== 0
  ) {
    throw Object.assign({}, new Error('Error.'), { response });
  } else {
    return response.data;
  }
}

export async function noECheckRequest({ method, url, data, headers }) {
  if (headers === undefined) {
    await updateHeaders();
  }

  const promise = instance[method](url, data);
  let response;
  try {
    response = await promise;
  } catch (error) {
    throw error;
  }

  return response.data;
}

export const independentRequest = async (url, method, data) => {
  const promise = axios[method](url, data);
  let response;
  try {
    response = await promise;
  } catch (error) {
    throw error.response;
  }
  const payload = response;
  return payload;
};

export async function get(url, params, config) {
  for (var key in params) {
    url = url + '/' + params[key];
  }
  return request({ method: 'get', url, data: {}, ...config });
}

export async function del(url, params, config) {
  return request({ method: 'delete', url, data: { data: params }, ...config });
}

export async function post(url, data, config) {
  if (config && config.params) {
    for (const key in config.params) {
      url = url + '/' + config.params[key];
    }
  }
  return request({ method: 'post', url, data, ...config });
}

export async function noECheckPost(url, data, config) {
  return noECheckRequest({ method: 'post', url, data, ...config });
}

export async function put(url, data, config) {
  return request({ method: 'put', url, data, ...config });
}
