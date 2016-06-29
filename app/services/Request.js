import queryString from 'query-string';
import config from '../config';

let request = {};

function handleErrors(res) {
  if (res.ok) {
    return res;
  }
  return res.json()
  .then(function (err) {
    if (err.hasOwnProperty('error')) {
      throw new Error(err.error);
    } else {
      throw new Error('An unknown error occurred');
    }
  });
}

request.get = function (url, params) {
  let apiUrl = `${config.api_url}${url}`;
  if (params) {
    apiUrl = `${apiUrl}?${queryString.stringify(params)}`;
  }
  return fetch(apiUrl)
    .then(handleErrors)
    .then(res=>res.json());
};

request.post = function (url, body, jwt = '') {
  let apiUrl = `${config.api_url}${url}`;
  let fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: jwt ? 'Token token=' + jwt : ''
    },
    body: JSON.stringify(body)
  };
  return fetch(apiUrl, fetchOptions)
    .then(handleErrors)
    .then(res=>res.json());
};

request.upload = function (url, body, jwt = '', method = 'POST') {
  let apiUrl = `${config.api_url}${url}`;
  let fetchOptions = {
    method: method,
    headers: {
      Authorization: jwt ? 'JWT ' + jwt : ''
    },
    body: body
  };
  return fetch(apiUrl, fetchOptions)
    .then(handleErrors)
    .then(res=>res.json());
};

request.patch = function (url, body, jwt = '') {
  let apiUrl = `${config.api_url}${url}`;
  let fetchOptions = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: jwt ? 'JWT ' + jwt : '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  return fetch(apiUrl, fetchOptions)
    .then(handleErrors)
    .then(res=>res.json());
};

request.put = function (url, body, jwt = '') {
  let apiUrl = `${config.api_url}${url}`;
  let fetchOptions = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: jwt ? 'JWT ' + jwt : '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  return fetch(apiUrl, fetchOptions)
    .then(handleErrors)
    .then(res=>res.json());
};

request.protectedGet = function (url, jwt, params) {
  let apiUrl = `${config.api_url}${url}`;
  if (params) {
    apiUrl = `${apiUrl}${queryString.stringify(params)}`;
  }
  let fetchOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: jwt ? 'Token token=' + jwt : ''
    }
  };
  return fetch(apiUrl, fetchOptions)
    .then(handleErrors)
    .then(res=>res.json());
};

request.delete = function (url, jwt = '') {
  let apiUrl = `${config.api_url}${url}`;
  let fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: jwt ? 'Token token=' + jwt : ''
    },
  };

  return fetch(apiUrl, fetchOptions)
    .then(handleErrors)
    .then();
};

module.exports = request;
