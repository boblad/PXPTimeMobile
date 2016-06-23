import Request from './Request';

let req = {};

req.listInvoices = (apiKey, startDate, endDate) => {
  let url = `/vendor_invoices/?start=${startDate}&end=${endDate}`;
  return Request.protectedGet(url, apiKey)
  .then(data => data);
}

exports.req = req;
