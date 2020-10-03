import {TOGGLE_MENU, CLOSE_MENU} from '../actions/actionTypes'

export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU
  }
}

export const closeMenu = () => {
  return {
    type: CLOSE_MENU
  }
}