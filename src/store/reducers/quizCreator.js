import {
  CHANGE_FORM_CONTROLS,
  CHANGE_IS_FORM_VALID,
  SET_RIGHT_ANSWER,
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION,
} from '../actions/actionTypes';

const createControl = (config, validation) => {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: '',
  };
};

const createOptionControl = (number) =>
  createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: 'Значение не может быть пустым',
      id: number,
    },
    { required: true }
  );

export const createFormControls = () => {
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
};

const initialState = {
  isFormValid: false,
  rightAnswerId: 1,
  formControls: createFormControls(),
  quiz: [],
};

const quizCreatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RIGHT_ANSWER:
      return {
        ...state,
        rightAnswerId: action.id,
      };
    case CHANGE_IS_FORM_VALID:
      return {
        ...state,
        isFormValid: action.validState,
      };
    case CHANGE_FORM_CONTROLS:
      return {
        ...state,
        formControls: action.formControls,
      };
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.questionItem],
      };
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quiz: [],
      };
    default:
      return state;
  }
};

export default quizCreatorReducer;
