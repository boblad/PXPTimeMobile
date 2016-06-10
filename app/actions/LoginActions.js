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
        }).done()
      }).done();
      dispatch(loginSuccess(response));
      dispatch(toggleIsLoading(false));
      console.log(router);
      router.toRootTab();
    })
    .catch((err) => {
      console.log(err);
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
      }).done();
      dispatch(toggleIsLoading(false));
      router.toRootTab();
    })
    .catch((err) => {
      dispatch(toggleIsLoading(false));
      dispatch(setErrorMessage('invalid api key'))
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
