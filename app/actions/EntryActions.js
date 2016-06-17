import EntryService from '../services/EntryService';
import { toggleIsLoading } from './LoadingActions';
import { clearBoard } from './BoardActions';
import { clearCard } from './CardActions';
import { LIST_ENTRY_SUCCESS, CLEAR_ENTRIES } from '../constants/actionTypes';
import { setSuccessMessage, setErrorMessage, clearMessages } from './MessageActions';
import config from '../config';
import moment from 'moment';

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

export const createEntry = (key, entryApiKey) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    EntryService.req.createEntry(key, entryApiKey)
    .then((data) => {
      let startDate = moment().format('YYYY-MM-DD');
      let endDate = moment().add(2, 'days').format('YYYY-MM-DD');
      dispatch(toggleIsLoading(false));
      dispatch(clearBoard());
      dispatch(clearCard());
      dispatch(listEntries(key, startDate, endDate));
      dispatch(setSuccessMessage('Entry Created'));
    })
    .catch((err) => {
      dispatch(toggleIsLoading(false));
      dispatch(setErrorMessage('Entry Failed'));
    })
  }
}

export const deleteEntry = (key, body) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    EntryService.req.deleteEntry(key, body)
    .then((data) => {
      let startDate = moment().format('YYYY-MM-DD');
      let endDate = moment().add(2, 'days').format('YYYY-MM-DD');
      dispatch(toggleIsLoading(false));
      dispatch(listEntries(key, startDate, endDate));
      dispatch(setSuccessMessage('Entry Deleted'));
    })
    .catch((err) => {
      dispatch(toggleIsLoading(false));
      dispatch(setErrorMessage('Entry Failed'));
    })
  }
}

const entriesClear = () => ({
  type: CLEAR_ENTRIES
})

export const clearEntries = () => {
  return (dispatch) => {
    dispatch(entriesClear());
  }
}
