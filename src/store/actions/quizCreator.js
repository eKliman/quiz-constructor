import { sendRequest } from '../../utils/queries';
import {
  CHANGE_FORM_CONTROLS,
  CHANGE_IS_FORM_VALID,
  CREATE_QUIZ_QUESTION,
  SET_RIGHT_ANSWER,
  RESET_QUIZ_CREATION,
} from './actionTypes';

export const changeRightAnswer = (id) => {
  return {
    type: SET_RIGHT_ANSWER,
    id,
  };
};

export const changeIsFormValid = (validState) => {
  return {
    type: CHANGE_IS_FORM_VALID,
    validState,
  };
};

export const changeFormControls = (formControls) => {
  return {
    type: CHANGE_FORM_CONTROLS,
    formControls,
  };
};

export const createQuizQuestion = (questionItem) => {
  return {
    type: CREATE_QUIZ_QUESTION,
    questionItem,
  };
};

export const resetQuizCreation = () => {
  return {
    type: RESET_QUIZ_CREATION,
  };
};

export const finishCreateQuiz = () => {
  return async (dispatch, getState) => {
    await sendRequest('POST', 'quizes.json', getState().create.quiz);
    dispatch(resetQuizCreation());
  };
};
