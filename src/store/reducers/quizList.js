import {
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZES_ERROR, 
  // FETCH_QUIZ_SUCCESS,
  // QUIZ_SET_STATE,
  // FINISH_QUIZ,
  // QUIZ_NEXT_QUESTION,
  // QUIZ_RETRY
} from '../actions/actionTypes'

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  // results: {},
  // isFinished: false,
  // activeQuestion: 0,
  // answerState: null,
  // quiz: null
}

const quizListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state, loading: true
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state, loading: false, quizes: action.quizes
      }
    case FETCH_QUIZES_ERROR:
      return {
        ...state, loading: false, error: action.error
      }
    default:
      return state
  }
}

export default quizListReducer