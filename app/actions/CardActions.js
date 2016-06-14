import CardService from '../services/CardService';
import { toggleIsLoading } from './LoadingActions';
import {
  LIST_CARD_SUCCESS,
  SELECT_CARD,
  CLEAR_CARD,
} from '../constants/actionTypes';
import config from '../config';

const listCardsSuccess = (results) => {
  return {
    type: LIST_CARD_SUCCESS,
    results: results.cards,
    board: results.board
  }
}

export const listCards = (key, boardKey) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    CardService.req.listCards(key, boardKey)
    .then((cards) => {
      dispatch(listCardsSuccess(cards));
      dispatch(toggleIsLoading(false));
    })
    .catch((err) => {
      dispatch(toggleIsLoading(false));
    })
  }
}


const cardSelect = (card) => {
  return {
    type: SELECT_CARD,
    card
  }
}

export const selectCard = (card) => {
  return (dispatch) => {
    dispatch(cardSelect(card))
  }
}

export const clearCard = () => {
  return {
    type: CLEAR_CARD
  }
}
