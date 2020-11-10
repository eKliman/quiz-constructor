import {
  AUTH_SUCCESS, 
  AUTH_LOGOUT,
  CHANGE_AUTH_FORM_CONTROLS,
  SET_IS_FORM_VALID,
  SET_AUTH_ERROR,
  CLEAR_AUTH_STATE
} from '../actions/actionTypes'

const createFormControls = () => {
  return {
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Enter correct email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Password',
      errorMessage: 'Password must be at least 6 characters',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  }
}

const initialState = {
  token: null,
  userId: null,
  isFormValid: false,
  error: '',
  formControls: createFormControls(),
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, 
        token: action.token, 
        userId: action.userId, 
        formControls: createFormControls()
      }
    case AUTH_LOGOUT:
      return {
        ...state, token: null, userId: null
      }
    case CHANGE_AUTH_FORM_CONTROLS:
      return {
        ...state, formControls: action.formControls
      }
    case SET_IS_FORM_VALID:
      return {
        ...state, isFormValid: action.isFormValid
      }
    case SET_AUTH_ERROR:
      return {
        ...state, error: action.error, isFormValid: true
      }
    case CLEAR_AUTH_STATE:
      return {
        ...state, isFormValid: false, error: '', formControls: createFormControls()
      }
    default:
      return state
  }
}