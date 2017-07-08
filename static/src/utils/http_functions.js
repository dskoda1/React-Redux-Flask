/* eslint camelcase: 0 */

import axios from 'axios';

const tokenConfig = (token) => ({
    headers: {
        'Authorization': token, // eslint-disable-line quote-props
    },
});

const executeRequest = (method, url, body) => {
  try {
    return axios[method](url, body);
  } catch (err) {
    console.log(`${method} request to ${url} faild with error:\n${error}`);
  }
}

export function validate_token(token) {
    return executeRequest('post', '/api/is_token_valid', {
        token,
    });
}

export function get_github_access() {
    window.open(
        '/github-login',
        '_blank' // <- This is what makes it open in a new window.
    );
}

export function create_user(email, password) {
    return executeRequest('post', 'api/create_user', {
        email,
        password,
    });
}

export function get_token(email, password) {
    return executeRequest('post', 'api/get_token', {
        email,
        password,
    });
}

export function has_github_token(token) {
    return executeRequest('get', 'api/has_github_token', tokenConfig(token));
}

export function data_about_user(token) {
    return executeRequest('get', 'api/user', tokenConfig(token));
}

export function get_category_list(token) {
  return executeRequest('get', 'api/categories', tokenConfig(token));
}

export function create_category(token, name) {
  const body = tokenConfig(token);
  body['data'] = { name };
  return executeRequest('post', 'api/categories', body);
}

export function delete_category(token, id) {
  return executeRequest('delete', `api/categories/${id}`, tokenConfig(token));
}
