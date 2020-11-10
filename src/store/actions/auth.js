import {sendRequest} from '../../utils/queries'
import {
  AUTH_SUCCESS, 
  AUTH_LOGOUT,
  CHANGE_AUTH_FORM_CONTROLS,
  SET_IS_FORM_VALID,
  SET_AUTH_ERROR,
  CLEAR_AUTH_STATE
} from './actionTypes'

export const changeAuthFormControls = formControls => {
  return {
    type: CHANGE_AUTH_FORM_CONTROLS,
    formControls,
  }
}

export const setIsFormValid = isFormValid => {
  return {
    type: SET_IS_FORM_VALID,
    isFormValid,
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    token,
    userId,
  }
}

export const setAuthError = error => {
  return {
    type: SET_AUTH_ERROR,
    error,
  }
}

export const clearAuthState = error => {
  return {
    type: CLEAR_AUTH_STATE,
    error,
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export const auth = (email, password, isLogin) => {
  return async dispatch => {
    const authData = {
      email, password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGnmhaj41LSd0sx3eBNIHlpNfeiKshlSU'

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGnmhaj41LSd0sx3eBNIHlpNfeiKshlSU'
    }

    const data = await sendRequest('POST', url, authData, false)
    if (Object.keys(data)[0] === 'error') {
      dispatch(setAuthError(data.error.message))
    } else {
      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
  
      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('expirationDate', expirationDate)
  
      dispatch(authSuccess(data.idToken, data.localId))
      dispatch(autoLogout(data.expiresIn))
      dispatch(setAuthError(''))
    }

  }
}

export const autoLogin = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token, userId))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}