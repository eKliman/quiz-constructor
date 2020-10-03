import { combineReducers } from 'redux' 
import quizCreatorReducer from './quizCreator' 
import quizListReducer from './quiz' 
import authReducer from './auth'
import headerReducer from './header'

export default combineReducers({
  create: quizCreatorReducer,
  quiz: quizListReducer,
  auth: authReducer,
  header: headerReducer,
}) 
