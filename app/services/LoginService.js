import Request from './Request';

let req = {};

req.loginUserWithCreds = (credentials) => {
  let url = `/users/authenticate/`;
  return Request.post(url, credentials)
  .then(data => data);
}

req.loginUserWithKey = (apiKey) => {
  let url = `/users/authenticate/`;
  return Request.post(url, apiKey)
  .then(data => data);
}

exports.req = req;
