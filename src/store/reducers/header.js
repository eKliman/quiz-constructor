import {TOGGLE_MENU, CLOSE_MENU} from '../actions/actionTypes'

const initialState = {
  menu: false
}

export default function headerReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state, menu: !state.menu
      }
    case CLOSE_MENU:
      return {
        ...state, menu: false
      }
    default:
      return state
  }
}