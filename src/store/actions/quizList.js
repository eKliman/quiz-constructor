import {sendRequest} from '../../utils/queries'
import {
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZES_ERROR, 
  // FETCH_QUIZ_SUCCESS,
  // QUIZ_SET_STATE,
  // FINISH_QUIZ,
  // QUIZ_NEXT_QUESTION,
  // QUIZ_RETRY
} from './actionTypes'

export const fetchQuizes = () => {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await sendRequest('GET', 'quizes.json') 
      const quizes = []
      Object.keys(response).forEach((key) => {
        quizes.push({
          id: key,
          name: response[key].quizTitle
        })
      })
      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  } 
}

export const fetchQuizesStart = () => {
  return {
    type: FETCH_QUIZES_START
  }
}

export const fetchQuizesSuccess = quizes => {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export const fetchQuizesError = e => {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}