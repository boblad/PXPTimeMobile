import { AsyncStorage } from 'react-native';
import LoginService from '../services/LoginService';
import BoardService from '../services/BoardService';
import { toggleIsLoading } from './LoadingActions';
import { LOGIN_SUCCESS, SET_API_KEY, CLEAR_USER } from '../constants/actionTypes';
import { setSuccessMessage, setErrorMessage, clearMessages } from './MessageActions';
import config from '../config';


const storeApiKey = (key) => {
  return {
    type: SET_API_KEY,
    key
  }
}

export const setApiKey = (key) => {
  return (dispatch) => {
    dispatch(storeApiKey(key));
  }
}

const loginSuccess = (result) => {
  return {
    type: LOGIN_SUCCESS,
    user: result.user.private_profile
  }
}

export const loginWithCreds = (email, password, router) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    let credentials = {
      email: email,
      password: password
    }
    LoginService.req.loginUserWithCreds(credentials)
    .then((response) => {
      AsyncStorage.setItem('apikey', response.user.private_profile.apikey).then(() => {
        AsyncStorage.getItem('apikey').then((value) => {
          dispatch(storeApiKey(value));
          dispatch(loginSuccess(response));
          dispatch(toggleIsLoading(false));
          router.toRootTab();
        }).done()
      }).done();
    })
    .catch((err) => {
      dispatch(toggleIsLoading(false));
      dispatch(setErrorMessage('Login Failed'));
    })
  }
}

export const loginWithKey = (key, router) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    BoardService.req.listBoards(key)
    .then((user) => {
      AsyncStorage.setItem('apikey', key).then(() => {
        AsyncStorage.getItem('apikey').then((value) => {
          dispatch(storeApiKey(value));
          dispatch(toggleIsLoading(false));
          router.toRootTab();
        }).done()
      }).done();
    })
    .catch((err) => {
      dispatch(toggleIsLoading(false));
      dispatch(setErrorMessage('invalid api key'));
    })
  }
}

export const createUser = (user, router) => {
  return (dispatch) => {
    dispatch(toggleIsLoading(true));
    LoginService.req.createUser(user)
    .then((response) => {
      AsyncStorage.setItem('apikey', response.user.private_profile.apikey).then(() => {
        AsyncStorage.getItem('apikey').then((value) => {
          dispatch(storeApiKey(value));
          dispatch(loginSuccess(response));
          dispatch(toggleIsLoading(false));
          router.toRootTab();
        }).done()
      }).done();
    })
    .catch((err) => {
      dispatch(toggleIsLoading(false));
      dispatch(setErrorMessage('invalid user submission'));
    })
  }
}

const userClear = () => {
  return {
    type: CLEAR_USER
  }
}

export const clearUser = (router) => {
  return (dispatch) => {
    AsyncStorage.removeItem('apikey')
    .then(() => {
      dispatch(userClear());
    })
    .then(() => {
      router.toLogin();
    }).done();
  }
}
