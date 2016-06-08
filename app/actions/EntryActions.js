import EntryService from '../services/EntryService';
import { toggleIsLoading } from './LoadingActions';
import { LIST_ENTRY_SUCCESS } from '../constants/actionTypes';
import { setSuccessMessage, setErrorMessage, clearMessages } from './MessageActions';
import config from '../config';

const listEntrySuccess = (results) => {
  return {
    type: LIST_ENTRY_SUCCESS,
    results: results.entries
  }
}

export const listEntries = (key, startDate, endDate) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    EntryService.req.listEntries(key, startDate, endDate)
    .then((entries) => {
      dispatch(listEntrySuccess(entries));
      dispatch(toggleIsLoading(false));
    })
    .catch((err) => {
      dispatch(toggleIsLoading(false));
    })
  }
}

export const createEntry = (key, body) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    EntryService.req.createEntry(key, body)
    .then((data) => {
      dispatch(toggleIsLoading(false));
      dispatch(setSuccessMessage('Entry Created'));
    })
    .catch((err) => {
      dispatch(toggleIsLoading(false));
      dispatch(setErrorMessage('Entry Failed'));
    })
  }
}
