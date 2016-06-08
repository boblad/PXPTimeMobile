import { LIST_ENTRY_SUCCESS } from '../constants/actionTypes';

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
    default:
      return state;
  }
}
