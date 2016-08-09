import Request from './Request';

let req = {};

req.listInvoices = (apiKey, startDate, endDate, page=1) => {
  let url = `/vendor_invoices/?start=${startDate}&end=${endDate}&page=${page}`;
  return Request.protectedGet(url, apiKey)
  .then(data => data);
}

exports.req = req;
