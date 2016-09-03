import InvoiceService from '../services/InvoiceService';
import { toggleIsLoading } from './LoadingActions';
import { LIST_INVOICE_SUCCESS, CLEAR_INVOICES } from '../constants/actionTypes';
import config from '../config';

const listInvoiceSuccess = (results) => {
  return {
    type: LIST_INVOICE_SUCCESS,
    results: results.invoices,
    page_count: results.page_count
  }
}

const clearInvoices = () => {
  return {
    type: CLEAR_INVOICES
  }
}

export const clearAllInvoices = () => {
  return (dispatch) => {
    dispatch(clearInvoices());
  }
}

export const listInvoices = (key, startDate, endDate, page=1) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    dispatch(clearInvoices());
    InvoiceService.req.listInvoices(key, startDate, endDate, page)
    .then((invoices) => {
      dispatch(listInvoiceSuccess(invoices));
      dispatch(toggleIsLoading(false));
    })
    .catch((err) => {
      dispatch(toggleIsLoading(false));
    })
  }
}

export const listAllInvoices = (key, startDate, endDate, page=1) => {
  return (dispatch, getState) => {
    const currentState = getState();
    dispatch(toggleIsLoading(true));
    dispatch(clearInvoices());
    InvoiceService.req.listInvoices(key, startDate, endDate, 1)
    .then((invoices) => {
      const pages = invoices.page_count;
      for (i = 1; i <= pages; i++) {
        dispatch(listInvoices(key, startDate, endDate, i))
      }
    })
    .catch((err) => {
      dispatch(toggleIsLoading(false));
    })
  }
}
