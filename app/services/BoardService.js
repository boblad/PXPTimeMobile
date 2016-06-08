import Request from './Request';

let req = {};

req.listBoards = (apiKey) => {
  let url = `/boards/`;
  return Request.protectedGet(url, apiKey)
  .then(data => data);
}

exports.req = req;
