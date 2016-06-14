import EntryService from '../services/EntryService';
import { toggleIsLoading } from './LoadingActions';
import { clearBoard } from './BoardActions';
import { clearCard } from './CardActions';
import { LIST_ENTRY_SUCCESS } from '../constants/actionTypes';
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
      console.log('Entries List Error', err);
      dispatch(toggleIsLoading(false));
    })
  }
}

export const createEntry = (key, body) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    EntryService.req.createEntry(key, body)
    .then((data) => {
      let startDate = moment().format('YYYY-MM-DD');
      let endDate = moment().add(2, 'days').format('YYYY-MM-DD');
      dispatch(toggleIsLoading(false));
      dispatch(clearBoard(false));
      dispatch(clearCard(false));
      dispatch(listEntries(key, startDate, endDate));
      dispatch(setSuccessMessage('Entry Created'));
    })
    .catch((err) => {
      dispatch(toggleIsLoading(false));
      dispatch(setErrorMessage('Entry Failed'));
    })
  }
}
