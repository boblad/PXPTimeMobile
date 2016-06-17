import Request from './Request';

let req = {};

req.createUser = (user) => {
  let url = `/users/`;
  return Request.post(url, user)
  .then(data => data);
}

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
