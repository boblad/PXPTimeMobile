import Request from './Request';

let req = {};

req.listEntries = (apiKey, startDate, endDate, page=1) => {
  let url = `/entries?start=${startDate}&end=${endDate}&page=${page}`;
  return Request.protectedGet(url, apiKey)
  .then(data => data);
}

req.createEntry = (apiKey, body) => {
  let url = `/entries/`;
  return Request.post(url, body, apiKey)
  .then(data => data);
}

req.deleteEntry = (apiKey, entryApiKey) => {
  let url = `/entries/${entryApiKey}/`;
  return Request.delete(url, apiKey)
  .then(data => data);
}

exports.req = req;
