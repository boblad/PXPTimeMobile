import { LIST_ENTRY_SUCCESS, CLEAR_ENTRIES } from '../constants/actionTypes';

const initialState = {
  results: [],
  page_count: 0,
  current_page: 0
};

export default function entries(state = initialState, action = {}) {
  switch (action.type) {
    case LIST_ENTRY_SUCCESS:
      return {
        ...state,
        results: [...state.results, ...action.results],
        page_count: action.page_count,
        current_page: state.current_page++
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
