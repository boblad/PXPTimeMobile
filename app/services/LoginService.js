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

req.getRecoverKey = (username) => {
  let url = `/users/get_recover_key/${username}/`;
  return Request.get(url)
  .then(data => data);
}

req.setRecoverKey = (data) => {
  let url = `/users/set_recover/`;
  return Request.post(url, data)
  .then(data => data);
}

exports.req = req;
