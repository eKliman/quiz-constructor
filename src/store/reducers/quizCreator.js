import {
  CHANGE_FORM_CONTROLS,
  CHANGE_IS_FORM_VALID,
  SET_RIGHT_ANSWER,
  CREATE_QUIZ_QUESTION,
  CHANGE_QUIZ_CONTROLS,
  CREATE_QUIZ_TITLE,
  SET_INITIAL_STATE,
  CHANGE_IS_RENDER_TITLE,
  SET_EDITABLE_QUESTION,
  EDIT_QUIZ_QUESTION,
  CHANGE_IS_EDIT_QUIZ_TITLE,
} from '../actions/actionTypes'

const createControl = (config, validation) => {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: '',
  }
}

const createOptionControl = number =>
  createControl(
    {
      label: `Answer option ${number}`,
      errorMessage: 'Answer option cannot be empty',
      id: number,
    },
    {required: true}
  )

export const createFormControls = () => {
  return {
    question: createControl(
      {
        label: 'ENTER QUESTION',
        errorMessage: 'Question cannot be empty',
      },
      {required: true}
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

export const createTitleControls = () =>
  createControl(
    {
      label: 'Enter quiz name',
      errorMessage: 'Quiz name cannot be empty',
    },
    {required: true}
  )

const initialState = {
  isFormValid: false,
  rightAnswerId: 0,
  formControls: createFormControls(),
  titleControls: createTitleControls(),
  quizTitle: '',
  quiz: [],
  editableQuestion: null,
  isRenderTitle: true,
  isEditQuizTitle: false,
}

const quizCreatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RIGHT_ANSWER:
      return {
        ...state,
        rightAnswerId: action.id,
      }
    case CHANGE_IS_FORM_VALID:
      return {
        ...state,
        isFormValid: action.validState,
      }
    case CHANGE_FORM_CONTROLS:
      return {
        ...state,
        formControls: action.formControls,
      }
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.questionItem],
      }
    case EDIT_QUIZ_QUESTION:
      return {
        ...state,
        quiz: action.quiz,
      }
    case CHANGE_QUIZ_CONTROLS:
      return {
        ...state,
        titleControls: action.data,
      }
    case CREATE_QUIZ_TITLE:
      return {
        ...state,
        quizTitle: state.titleControls.value,
        titleControls: createTitleControls(),
      }
    case SET_INITIAL_STATE:
      return {
        ...initialState,
      }
    case CHANGE_IS_RENDER_TITLE:
      return {
        ...state,
        isRenderTitle: action.value,
      } 
    case SET_EDITABLE_QUESTION:
      return {
        ...state,
        editableQuestion: action.id,
      } 
    case CHANGE_IS_EDIT_QUIZ_TITLE:
      return {
        ...state,
        isEditQuizTitle: action.value,
      } 
    default:
      return state
  }
}

export default quizCreatorReducer
