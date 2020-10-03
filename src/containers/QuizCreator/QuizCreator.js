import React from 'react' 
import {connect} from 'react-redux' 
import {Redirect, withRouter} from 'react-router-dom' 
import QuestionCreater from '../../components/QuestionCreater/QuestionCreater' 
import QuestionList from '../../components/QuestonList/QuestionList' 
import QuizTitleCreater from '../../components/QuizTitleCreater/QuizTitleCreater' 
import {
  finishCreateQuiz, 
  setInitialState, 
  changeRightAnswer,
  changeFormControls,
  changeIsFormValid,
  changeIsRenderTitle,
  changeIsEditQuizTitle,
  setEditableQuestion,
} from '../../store/actions/quizCreator'
import {fetchQuizesStart} from '../../store/actions/quiz'
import {createFormControls} from '../../store/reducers/quizCreator' 
import Button from '../../components/UI/Button/Button'
import classes from './QuizCreator.module.scss'
import Loader from '../../components/UI/Loader/Loader'

const QuizCreator = props => {
  const createQuizHandler = async event => {
    event.preventDefault()
    props.fetchQuizesStart()
    await props.finishCreateQuiz()
    props.history.push('/')
  } 

  const cancelHandler = () => {
    props.setInitialState()
    props.history.push('/')
  } 

  const newQuestionHandler = () => {
    props.changeRightAnswer(0)
    props.changeFormControls(createFormControls()) 
    props.changeIsFormValid(false)
    props.changeIsRenderTitle(false)
    props.changeIsEditQuizTitle(false)
    props.setEditableQuestion(null)
    props.history.push('/quiz-creator')
  }

  return (
    props.isAuthenticated 
      ? <div className={classes.QuizCreator}>
          <h1>Quiz creation</h1>
          <QuestionList />
          {
            props.loading
              ? <Loader/>
              : props.isRenderTitle ? <QuizTitleCreater /> : <QuestionCreater />
          }
          
          <div className={classes.buttonsBlock}>
            {
              props.editableQuestion !== null || props.isEditQuizTitle
                ? <Button
                  type="primary"
                  onClick={newQuestionHandler}
                >
                  New question
                </Button>
              : null
            }
            <Button
              type="success"
              onClick={createQuizHandler}
              disabled={props.quiz.length === 0}
            >
              Create quiz
            </Button>
            <Button type="cancel" onClick={cancelHandler}>
              Cancel
            </Button>
          </div>
        </div>
      : <Redirect to="/auth" />
  )
}

const mapStateToProps = state => {
  return {
    isRenderTitle: state.create.isRenderTitle,
    quiz: state.create.quiz,
    isEditQuizTitle: state.create.isEditQuizTitle,
    editableQuestion: state.create.editableQuestion,
    loading: state.quiz.loading,
    isAuthenticated: !!state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
    setInitialState: () => dispatch(setInitialState()),
    changeRightAnswer: id => dispatch(changeRightAnswer(id)),
    changeFormControls: data => dispatch(changeFormControls(data)),
    changeIsFormValid: data => dispatch(changeIsFormValid(data)),
    changeIsEditQuizTitle: value => dispatch(changeIsEditQuizTitle(value)),
    changeIsRenderTitle: (value) => dispatch(changeIsRenderTitle(value)),
    setEditableQuestion: (id) => dispatch(setEditableQuestion(id)),
    fetchQuizesStart: () => dispatch(fetchQuizesStart()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuizCreator))
