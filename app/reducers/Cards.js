import {
  LIST_CARD_SUCCESS,
  SELECT_CARD
} from '../constants/actionTypes';

const initialState = {
  results: [],
  board: {},
  selectedCard: null
};

export default function cards(state = initialState, action = {}) {
  switch (action.type) {
    case LIST_CARD_SUCCESS:
      return {
        ...state,
        results: action.results,
        board: action.board
      };
    case SELECT_CARD:
      return {
        ...state,
        selectedCard: action.card
      };
    default:
      return state;
  }
}