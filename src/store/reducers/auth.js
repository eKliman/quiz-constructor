import {
  AUTH_SUCCESS, 
  AUTH_LOGOUT,
  CHANGE_AUTH_FORM_CONTROLS,
  SET_IS_FORM_VALID,
  SET_AUTH_ERROR,
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
      errorMessage: 'Enter correct password',
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
  isFormValid: false,
  error: '',
  formControls: createFormControls(),
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, token: action.token, formControls: createFormControls()
      }
    case AUTH_LOGOUT:
      return {
        ...state, token: null
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
        ...state, error: action.error
      }
    default:
      return state
  }
}