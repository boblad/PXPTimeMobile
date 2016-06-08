import Request from './Request';

let req = {};

req.listEntries = (apiKey, startDate, endDate) => {
  let url = `/entries?start=${startDate}&end=${endDate}`;
  return Request.protectedGet(url, apiKey)
  .then(data => data);
}

req.createEntry = (apiKey, body) => {
  let url = `/entries/`;
  return Request.post(url, body, apiKey)
  .then(data => data);
}

exports.req = req;
