import React from 'react' 
import { Redirect, Route, Switch } from 'react-router-dom' 
import QuizCreator from './containers/QuizCreator/QuizCreator' 
import QuizList from './containers/QuizList/QuizList' 
import Layout from './Layout/Layout'
import Quiz from './containers/Quiz/Quiz' 

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/quiz-creator/:id" component={QuizCreator} />
        <Route path="/quiz-creator" exact component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  ) 
}

export default App 
