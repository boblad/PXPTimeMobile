import Request from './Request';

let req = {};

req.listInvoices = (apiKey) => {
  let url = `/vendor_invoices/`;
  return Request.protectedGet(url, apiKey)
  .then(data => data);
}

req.listReactBoard = (apiKey) => {
  let url = `/entries/boards/SGv9k3vh9KVbAMiROI7V8g/?start=2016-04-01&end=2016-05-31&filter=billed`
  return Request.protectedGet(url, apiKey)
  .then(data => data)
}

exports.req = req;
