import React from 'react';
import { Link } from 'react-router-dom';
import classes from './QuizList.module.scss';

const list = ['How do you realy feel?', 'Check your English level'];

const renderQuizes = (quizes) => {
  return quizes.map((quiz, index) => (
    <li key={index}>
      <Link to={'/quiz/:id'}>{quiz}</Link>
    </li>
  ));
};

const QuizList = () => (
  <div className={classes.QuizList}>
    <h1>Quiz list</h1>
    {renderQuizes(list)}
  </div>
);

export default QuizList;
