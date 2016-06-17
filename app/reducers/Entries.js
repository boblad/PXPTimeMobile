import { LIST_ENTRY_SUCCESS, CLEAR_ENTRIES } from '../constants/actionTypes';

const initialState = {
  results: []
};

export default function entries(state = initialState, action = {}) {
  switch (action.type) {
    case LIST_ENTRY_SUCCESS:
      return {
        ...state,
        results: action.results
      };
    case CLEAR_ENTRIES:
      return {
        ...state,
        results: []
      };
    default:
      return state;
  }
}
