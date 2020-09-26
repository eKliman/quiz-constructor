import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classes from './QuizCreator.module.scss';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Select from '../../components/UI/Select/Select';
import {
  changeFormControls,
  changeIsFormValid,
  changeRightAnswer,
  createQuizQuestion,
  finishCreateQuiz,
} from '../../store/actions/quizCreator';
import { createFormControls } from '../../store/reducers/quizCreator';

const submitHandler = (event) => event.preventDefault();

export function validate(value, validation = null) {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }
  return isValid;
}

export function validateForm(formControls) {
  let isFormValid = true;
  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid;
    }
  }
  return isFormValid;
}

const changeHandler = (value, controlName, props) => {
  const formControls = { ...props.formControls };
  const control = { ...formControls[controlName] };
  control.touched = true;
  control.value = value;
  control.valid = validate(control.value, control.validation);

  formControls[controlName] = control;
  props.changeIsFormValid(validateForm(formControls));
  props.changeFormControls(formControls);
};

const QuizCreator = (props) => {
  const selectChangeHandler = (event) => {
    props.changeRightAnswer(+event.target.value);
  };

  const renderInputs = (props) => {
    return Object.keys(props.formControls).map((controlName, index) => {
      const control = props.formControls[controlName];
      return (
        <Fragment key={index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              changeHandler(event.target.value, controlName, props)
            }
          />
          {index === 0 ? <hr /> : null}
        </Fragment>
      );
    });
  };

  const addQuestionHandler = (event) => {
    event.preventDefault();

    const { question, option1, option2, option3, option4 } = props.formControls;
    const questionItem = {
      question: question.value,
      id: props.quiz.length + 1,
      rightAnswerId: props.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    props.createQuizQuestion(questionItem);

    props.changeRightAnswer(1);
    props.changeFormControls(createFormControls());
    props.changeIsFormValid(false);
  };

  const createQuizHandler = (event) => {
    event.preventDefault();

    // this.setState({
    //   isFormValid: false,
    //   rightAnswerId: 1,
    //   formControls: createFormControls(),
    // });
    props.finishCreateQuiz();

    // ///////////
    // axios.post('https://react-quiz-6821a.firebaseio.com/quizes.json', this.state.quiz)
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(error => console.log(error))
  };

  return (
    <div className={classes.QuizCreator}>
      <h1>Quiz creation</h1>
      <form onSubmit={submitHandler}>
        {renderInputs(props)}

        <Select
          label="Выберите правильный ответ"
          value={props.rightAnswerId}
          onChange={selectChangeHandler}
          options={[
            { text: 1, value: 1 },
            { text: 2, value: 2 },
            { text: 3, value: 3 },
            { text: 4, value: 4 },
          ]}
        />

        <Button
          type="primary"
          onClick={addQuestionHandler}
          disabled={!props.isFormValid}
        >
          Добавить вопрос
        </Button>

        <Button
          type="success"
          onClick={createQuizHandler}
          disabled={props.quiz.length === 0}
        >
          Создать тест
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rightAnswerId: state.create.rightAnswerId,
    formControls: state.create.formControls,
    isFormValid: state.create.isFormValid,
    quiz: state.create.quiz,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeRightAnswer: (id) => dispatch(changeRightAnswer(id)),
    changeFormControls: (data) => dispatch(changeFormControls(data)),
    changeIsFormValid: (data) => dispatch(changeIsFormValid(data)),
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: (item) => dispatch(finishCreateQuiz()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
