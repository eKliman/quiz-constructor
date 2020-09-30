import { combineReducers } from 'redux' 
import quizCreatorReducer from './quizCreator' 
import quizListReducer from './quizList' 

export default combineReducers({
  create: quizCreatorReducer,
  list: quizListReducer,
}) 
