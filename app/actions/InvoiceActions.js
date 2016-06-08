import InvoiceService from '../services/InvoiceService';
import { toggleIsLoading } from './LoadingActions';
import { LIST_INVOICE_SUCCESS } from '../constants/actionTypes';
import config from '../config';

const listInvoiceSuccess = (results) => {
  return {
    type: LIST_INVOICE_SUCCESS,
    results: results.invoices
  }
}

export const listInvoices = (key) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    InvoiceService.req.listInvoices(key)
    .then((invoices) => {
      dispatch(listInvoiceSuccess(invoices));
      dispatch(toggleIsLoading(false));
    })
    .catch((err) => {
      dispatch(toggleIsLoading(false));
    })
  }
}

export const listReactBoard = (key) => {
  return (dispatch) => {
    InvoiceService.req.listReactBoard(key)
    .then((times) => {
      console.log('times', times)
    })
    .catch((err) => {

    })
  }
}
