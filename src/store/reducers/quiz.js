import {
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZES_ERROR, 
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  SET_DELETING_QUIZ_ID,
  SET_DELETING_QUIZ_NAME
} from '../actions/actionTypes'

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
  quizTitle: '',
  deletingQuizId: '',
  deletingQuizName: ''
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
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state, loading: false, quiz: action.quiz.quiz, quizTitle: action.quiz.quizTitle
      }
    case QUIZ_SET_STATE:
      return {
        ...state, answerState: action.answerState, results: action.results
      }
    case FINISH_QUIZ:
      return {
        ...state, isFinished: true
      }
    case QUIZ_NEXT_QUESTION:
      return {
        ...state, answerState: null, activeQuestion: action.number
      }
    case  SET_DELETING_QUIZ_ID:
      return {
        ...state, deletingQuizId: action.id
      }
    case  SET_DELETING_QUIZ_NAME:
      return {
        ...state, deletingQuizName: action.name
      }
    case QUIZ_RETRY:
      return {
        ...state, 
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null
      }
    default:
      return state
  }
}

export default quizListReducer