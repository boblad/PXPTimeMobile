import {
  LOGIN_SUCCESS,
  SET_API_KEY,
  CLEAR_USER
} from '../constants/actionTypes';

const initialState = {
  result: {},
  asyncKey: null
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        result: action.user
      };
    case SET_API_KEY:
      return {
        ...state,
        asyncKey: action.key
      }
    case CLEAR_USER:
      return {
        ...state,
        asyncKey: null,
        result: {}
      }
    default:
      return state;
  }
}
