import { combineReducers } from 'redux' 
import quizCreatorReducer from './quizCreator' 
import quizListReducer from './quiz' 

export default combineReducers({
  create: quizCreatorReducer,
  quiz: quizListReducer,
}) 
