import { LIST_INVOICE_SUCCESS } from '../constants/actionTypes';

const initialState = {
  results: []
};

export default function invoices(state = initialState, action = {}) {
  switch (action.type) {
    case LIST_INVOICE_SUCCESS:
      return {
        ...state,
        results: action.results
      };
    default:
      return state;
  }
}
