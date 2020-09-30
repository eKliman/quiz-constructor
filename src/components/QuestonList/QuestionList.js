import React from 'react'
import {connect} from 'react-redux'
import classes from './QuestionList.module.scss'
import {
  changeIsRenderTitle, 
  setEditableQuestion,
  changeFormControls,
  changeIsFormValid,
  changeRightAnswer,
  changetitleControls,
  changeIsEditQuizTitle,
} from '../../store/actions/quizCreator'
import { NavLink } from 'react-router-dom'

const QuestionList = props => {
  const titleHandler = () => {
    props.changeIsRenderTitle(true)
    const titleControls = {...props.titleControls}
    titleControls.value = props.quizTitle
    props.changetitleControls(titleControls)
    props.changeIsEditQuizTitle(true)
    props.setEditableQuestion(null)
  }

  const insertDataToFormControls = id => {
    const formControls = {...props.formControls}

    Object.keys(formControls).forEach((key, index) => {
      if (index) {
        formControls[key].value = props.quiz[id].answers[index - 1].text
        formControls[key].valid = true
      } else {
        formControls[key].value = props.quiz[id].question
        formControls[key].valid = true
      }
    })
    return formControls
  }

  const listItemHandler = (event) => {
    props.setEditableQuestion(+event.target.id)
    props.changeFormControls(insertDataToFormControls(event.target.id))
    props.changeRightAnswer(props.quiz[event.target.id].rightAnswerId)
    props.changeIsRenderTitle(false)
    props.changeIsEditQuizTitle(false)
  }
  const renderQuestions = props =>
    props.quiz.map(item => (
      <li key={item.id}>
        <NavLink
          to={`/quiz-creator/edit=${item.id}`}
          className={classes.listItem}
          activeClassName={classes.active}
          onClick={listItemHandler}
          id={item.id}
        >
          {`${item.id + 1}. ${item.question}`}
        </NavLink>
        {/* <QuestionListItem
          onClick={listItemHandler}
          id={item.id}
        >
          {`${item.id + 1}. ${item.question}`}
        </QuestionListItem> */}
      </li>
    )) 

  return (
    <div className={classes.QuestionList}>
      
      {props.quizTitle 
        ? <NavLink
            to="/quiz-creator/edit=title"
            className={classes.listItem}
            activeClassName={classes.active}
            onClick={titleHandler}
          >
            {'✔ ' + props.quizTitle}
          </NavLink>
        : null}
      <ul>{renderQuestions(props)}</ul>
    </div>
  ) 
} 

const mapStateToProps = state => {
  return {
    quizTitle: state.create.quizTitle,
    titleControls: state.create.titleControls,
    quiz: state.create.quiz,
    formControls: state.create.formControls,
  } 
} 

const mapDispatchToProps = dispatch => {
  return {
    changeIsRenderTitle: (value) => dispatch(changeIsRenderTitle(value)),
    setEditableQuestion: (id) => dispatch(setEditableQuestion(id)),
    changeRightAnswer: id => dispatch(changeRightAnswer(id)),
    changeFormControls: data => dispatch(changeFormControls(data)),
    changeIsFormValid: data => dispatch(changeIsFormValid(data)),
    changetitleControls: data => dispatch(changetitleControls(data)),
    changeIsEditQuizTitle: value => dispatch(changeIsEditQuizTitle(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList) 
