import { TOGGLE_IS_LOADING } from '../constants/actionTypes';

const toggleLoading = (isLoading) => {
  return {
    type: TOGGLE_IS_LOADING,
    isLoading
  };
};

export const toggleIsLoading = (isLoading) => {
  return (dispatch) => {
    dispatch(toggleLoading(isLoading));
  };
};
