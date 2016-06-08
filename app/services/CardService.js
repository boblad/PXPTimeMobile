import Request from './Request';

let req = {};

req.listCards = (apiKey, boardKey) => {
  let url = `/boards/cards_for_user/${boardKey}`;
  return Request.protectedGet(url, apiKey)
  .then(data => data);
}

exports.req = req;
