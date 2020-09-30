import React from 'react' 
import { connect } from 'react-redux'
import { Link } from 'react-router-dom' 
import classes from './QuizList.module.scss' 
import Loader from '../../components/UI/Loader/Loader'
import {fetchQuizes} from '../../store/actions/quiz'

class QuizList extends React.Component {
  renderQuizes() {
    return this.props.quizes.map(quiz => {
      return (
        <li
          key={quiz.id}
        >
          <Link to={'/quiz/' + quiz.id}>
            {'✔ ' + quiz.name}
          </Link>
        </li>
      )
    })
  }

  componentDidMount() {
    this.props.fetchQuizes()
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz list</h1>
          {
            this.props.loading
              ? <Loader/>
              : <ul>
                  {this.renderQuizes()}
                </ul>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList) 
