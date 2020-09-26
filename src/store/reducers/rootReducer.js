import { combineReducers } from 'redux';
import quizCreatorReducer from './quizCreator';

export default combineReducers({
  create: quizCreatorReducer,
});
