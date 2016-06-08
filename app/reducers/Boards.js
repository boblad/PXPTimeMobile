import {
  LIST_BOARD_SUCCESS,
  SELECT_BOARD
} from '../constants/actionTypes';

const initialState = {
  results: [],
  selectedBoard: {}
};

export default function boards(state = initialState, action = {}) {
  switch (action.type) {
    case LIST_BOARD_SUCCESS:
      return {
        ...state,
        results: action.results
      };
    case SELECT_BOARD:
      return {
        ...state,
        selectedBoard: action.board
      };
    default:
      return state;
  }
}
