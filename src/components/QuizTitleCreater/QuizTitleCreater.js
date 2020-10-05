import React from 'react'
import {connect} from 'react-redux'
import classes from './QuizTitleCreater.module.scss'
import {validate} from '../../utils/validation'
import {
  changetitleControls,
  createQuizTitle,
  changeIsRenderTitle,
  changeIsEditQuizTitle,
  changeRightAnswer,
  changeFormControls,
  changeIsFormValid,
} from '../../store/actions/quizCreator'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import { withRouter } from 'react-router-dom'
import {createFormControls} from '../../store/reducers/quizCreator' 

const QuizTitleCreater = props => {
  const changeHandler = value => {
    const titleControls = {...props.titleControls}
    titleControls.touched = true
    titleControls.value = value
    titleControls.valid = validate(
      titleControls.value,
      titleControls.validation
    )
    props.changetitleControls(titleControls) 
  }

  const cretateTitleHandler = () => {
    props.createQuizTitle()
    props.changeIsRenderTitle(false)
    props.changeIsEditQuizTitle(false)
    props.changeFormControls(createFormControls()) 
    props.changeRightAnswer(0) 
    props.changeIsFormValid(false)
    props.history.push('/quiz-creator')
  }
  
  return (
    <div className={classes.QuizTitleCreater}>
      <Input
        label={props.titleControls.label}
        value={props.titleControls.value}
        valid={props.titleControls.valid}
        shouldValidate={!!props.titleControls.validation}
        touched={props.titleControls.touched}
        errorMessage={props.titleControls.errorMessage}
        onChange={event => changeHandler(event.target.value)}
        focus={true}
      />
      <Button
        type="primary"
        onClick={cretateTitleHandler}
        disabled={!props.titleControls.valid}
      >
        {props.isEditQuizTitle ? 'Save changes' : 'Save title'}
      </Button>
      <hr />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    titleControls: state.create.titleControls,
    quizTitle: state.create.quizTitle,
    isEditQuizTitle: state.create.isEditQuizTitle,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changetitleControls: data => dispatch(changetitleControls(data)),
    createQuizTitle: () => dispatch(createQuizTitle()),
    changeIsRenderTitle: (value) => dispatch(changeIsRenderTitle(value)),
    changeIsEditQuizTitle: (value) => dispatch(changeIsEditQuizTitle(value)),
    changeRightAnswer: id => dispatch(changeRightAnswer(id)),
    changeFormControls: data => dispatch(changeFormControls(data)),
    changeIsFormValid: data => dispatch(changeIsFormValid(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuizTitleCreater))
