import React, {Fragment} from 'react' 
import {connect} from 'react-redux' 
import Button from '../UI/Button/Button' 
import Select from '../UI/Select/Select' 
import {submitHandler} from '../../utils/utils' 
import Input from '../UI/Input/Input' 
import {validate} from '../../utils/validation' 
import {
  changeFormControls,
  changeIsFormValid,
  changeRightAnswer,
  createQuizQuestion,
  editQuizQuestion,
  setEditableQuestion,
} from '../../store/actions/quizCreator' 
import {createFormControls} from '../../store/reducers/quizCreator' 
import classes from './QuestionCreater.module.scss' 
import { withRouter } from 'react-router-dom'

const validateForm = (formControls, rightAnswerId) => {
  let isFormValid = true 
  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid 
    }
  }
  isFormValid = rightAnswerId !== 0 && isFormValid
  return isFormValid 
} 

const changeHandler = (value, controlName, props) => {
  const formControls = {...props.formControls} 
  const control = {...formControls[controlName]} 
  control.touched = true 
  control.value = value 
  control.valid = validate(control.value, control.validation) 

  formControls[controlName] = control 
  props.changeIsFormValid(validateForm(formControls, props.rightAnswerId)) 
  props.changeFormControls(formControls) 
} 

const renderInputs = props => {
  return Object.keys(props.formControls).map((controlName, index) => {
    const control = props.formControls[controlName] 
    return (
      <Fragment key={index}>
        <Input
          label={control.label}
          value={control.value}
          valid={control.valid}
          shouldValidate={!!control.validation}
          touched={control.touched}
          errorMessage={control.errorMessage}
          isRight={(props.rightAnswerId === index && index !== 0) ? "right" : null}
          onChange={event =>
            changeHandler(event.target.value, controlName, props)
          }
        />
        {index === 0 ? <hr /> : null}
      </Fragment>
    ) 
  }) 
} 

const QuestionCreater = props => {
  const selectChangeHandler = event => {
    const value = +event.target.value
    props.changeRightAnswer(value) 
    props.changeIsFormValid(validateForm(props.formControls, value)) 
  } 

  const editQuestion = () => {
    const optionsArr = Object.keys(props.formControls).slice(1)
    const quiz = [...props.quiz]
    quiz[props.editableQuestion].rightAnswerId = props.rightAnswerId
    quiz[props.editableQuestion].question = props.formControls.question.value
    quiz[props.editableQuestion].answers.forEach((answer, index) => answer.text = props.formControls[optionsArr[index]].value)
    props.editQuizQuestion(quiz)
    props.changeFormControls(createFormControls()) 
    props.setEditableQuestion(null)
    props.changeRightAnswer(0) 
    props.changeIsFormValid(false) 
    props.history.push('/quiz-creator')
  }

  const addQuestionHandler = () => {
    const {question, option1, option2, option3, option4} = props.formControls 
    const questionItem = {
      question: question.value,
      id: props.quiz.length,
      rightAnswerId: props.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ],
    } 

    props.createQuizQuestion(questionItem) 
    props.changeRightAnswer(0) 
    props.changeFormControls(createFormControls()) 
    props.changeIsFormValid(false) 
  } 

  return (
    <form className={classes.QuestionCreater} onSubmit={submitHandler}>
      {renderInputs(props)}

      <Select
        label="Select the right answer"
        value={props.rightAnswerId}
        onChange={selectChangeHandler}
        options={[
          {text: '', value: 0, disabled: true},
          {text: 1, value: 1},
          {text: 2, value: 2},
          {text: 3, value: 3},
          {text: 4, value: 4},
        ]}
      />

      <Button
        type="primary"
        onClick={props.editableQuestion === null ? addQuestionHandler : editQuestion}
        disabled={!props.isFormValid}
      >
        {props.editableQuestion === null ? 'Save question' : 'Save changes'}
      </Button>
    </form>
  ) 
} 

const mapStateToProps = state => {
  return {
    isQuizTitleCreate: state.create.isQuizTitleCreate,
    rightAnswerId: state.create.rightAnswerId,
    formControls: state.create.formControls,
    isFormValid: state.create.isFormValid,
    quiz: state.create.quiz,
    editableQuestion: state.create.editableQuestion,
  } 
} 

const mapDispatchToProps = dispatch => {
  return {
    changeRightAnswer: id => dispatch(changeRightAnswer(id)),
    changeFormControls: data => dispatch(changeFormControls(data)),
    changeIsFormValid: data => dispatch(changeIsFormValid(data)),
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    editQuizQuestion: quiz => dispatch(editQuizQuestion(quiz)),
    setEditableQuestion: (id) => dispatch(setEditableQuestion(id)),
  } 
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionCreater)) 
