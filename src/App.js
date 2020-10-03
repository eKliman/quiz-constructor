import React from 'react' 
import { Redirect, Route, Switch } from 'react-router-dom' 
import QuizCreator from './containers/QuizCreator/QuizCreator' 
import QuizList from './containers/QuizList/QuizList' 
import Layout from './Layout/Layout'
import Quiz from './containers/Quiz/Quiz' 
import Auth from './containers/Auth/Auth'
import {autoLogin} from './store/actions/auth'
import {connect} from 'react-redux';

class App extends React.Component {
  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    return (
      <Layout>
        <Switch>
          {this.props.isAuthenticated ? null : <Route path="/auth" component={Auth} />}
          <Route path="/quiz-creator/:id" component={QuizCreator} />
          <Route path="/quiz-creator" exact component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    ) 
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
