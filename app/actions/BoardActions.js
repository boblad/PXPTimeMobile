import BoardService from '../services/BoardService';
import { toggleIsLoading } from './LoadingActions';
import {
  LIST_BOARD_SUCCESS,
  SELECT_BOARD,
  CLEAR_BOARD
} from '../constants/actionTypes';
import config from '../config';

const listBoardsSuccess = (projects) => {
  return {
    type: LIST_BOARD_SUCCESS,
    results: projects.boards
  }
}

export const listBoards = (key) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    BoardService.req.listBoards(key)
    .then((projects) => {
      dispatch(listBoardsSuccess(projects));
      dispatch(toggleIsLoading(false));
    })
    .catch((err) => {
      dispatch(toggleIsLoading(false));
    })
  }
}

const boardSelect = (board) => {
  return {
    type: SELECT_BOARD,
    board
  }
}

export const selectBoard = (board) => {
  return (dispatch) => {
    dispatch(boardSelect(board))
  }
}

export const clearBoard = () => {
  return {
    type: CLEAR_BOARD
  }
}
