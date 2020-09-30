import React from 'react' 
import { Redirect, Route, Switch } from 'react-router-dom' 
import QuizCreator from './containers/QuizCreator/QuizCreator' 
import QuizList from './containers/QuizList/QuizList' 
import Layout from './Layout/Layout' 

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/quiz-creator/:id" component={QuizCreator} />
        <Route path="/quiz-creator" exact component={QuizCreator} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  ) 
}

export default App 
