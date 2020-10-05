import {sendRequest} from '../../utils/queries'
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
          name: response[key].quizTitle,
          userId: response[key].userId
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

export const quizSetState = (answerState, results) => {
  return {
    type: QUIZ_SET_STATE,
    answerState, results
  }
}

export const finishQuiz = () => {
  return {
    type: FINISH_QUIZ
  }
}

export const quizNextQuestion = number => {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export const retryQuiz = () => {
  return {
    type: QUIZ_RETRY
  }
}

export const setDeletingQuizId = id => {
  return {
    type:  SET_DELETING_QUIZ_ID,
    id
  }
}

export const setDeletingQuizName = name => {
  return {
    type:  SET_DELETING_QUIZ_NAME,
    name
  }
}

const isQuizFinished = state => state.activeQuestion + 1 === state.quiz.length

export const quizAnswerClick = answerId => {
  return (dispatch, getState) => {
    const state = getState().quiz
    if (state.answerState) {
      return
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
      dispatch(quizSetState({[answerId]: 'success'}, results))
      
    } else {
      results[question.id] = 'error'
      dispatch(quizSetState({[answerId]: 'error'}, results))
    }
    
    const timeout = window.setTimeout(() => {
      if (isQuizFinished(state)) {
        dispatch(finishQuiz())
      } else {
        dispatch(quizNextQuestion(state.activeQuestion + 1))
      }
      window.clearTimeout(timeout)
    }, 1000)
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())

    try {
      const response = await sendRequest('GET', `quizes/${quizId}.json`)
      const quiz = response
      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}