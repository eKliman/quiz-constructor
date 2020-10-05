import {sendRequest} from '../../utils/queries'
import {
  CHANGE_FORM_CONTROLS,
  CHANGE_IS_FORM_VALID,
  CREATE_QUIZ_QUESTION,
  SET_RIGHT_ANSWER,
  CHANGE_QUIZ_CONTROLS,
  CREATE_QUIZ_TITLE,
  SET_INITIAL_STATE,
  CHANGE_IS_RENDER_TITLE,
  SET_EDITABLE_QUESTION,
  EDIT_QUIZ_QUESTION,
  CHANGE_IS_EDIT_QUIZ_TITLE,
} from './actionTypes'

export const changeRightAnswer = id => {
  return {
    type: SET_RIGHT_ANSWER,
    id,
  }
}

export const changeIsFormValid = validState => {
  return {
    type: CHANGE_IS_FORM_VALID,
    validState,
  }
}

export const changeFormControls = formControls => {
  return {
    type: CHANGE_FORM_CONTROLS,
    formControls,
  }
}

export const createQuizQuestion = questionItem => {
  return {
    type: CREATE_QUIZ_QUESTION,
    questionItem,
  }
}

export const finishCreateQuiz = () => {
  return async (dispatch, getState) => {
    await sendRequest('POST', 'quizes.json', {
      quizTitle: getState().create.quizTitle, 
      quiz: getState().create.quiz,
      userId: getState().auth.userId,
    }) 
    dispatch(setInitialState()) 
  }
}

export const changetitleControls = data => {
  return {
    type: CHANGE_QUIZ_CONTROLS,
    data,
  }
}

export const createQuizTitle = () => {
  return {
    type: CREATE_QUIZ_TITLE,
  }
}

export const setInitialState = () => {
  return {
    type: SET_INITIAL_STATE,
  }
}

export const changeIsRenderTitle = value => {
  return {
    type: CHANGE_IS_RENDER_TITLE,
    value,
  }
}

export const setEditableQuestion = id => {
  return {
    type: SET_EDITABLE_QUESTION,
    id,
  }
}

export const editQuizQuestion = quiz => {
  return {
    type: EDIT_QUIZ_QUESTION,
    quiz,
  }
}

export const changeIsEditQuizTitle = value => {
  return {
    type: CHANGE_IS_EDIT_QUIZ_TITLE,
    value,
  }
}
