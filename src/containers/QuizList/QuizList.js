import React from 'react' 
import {connect} from 'react-redux'
import {Link} from 'react-router-dom' 
import classes from './QuizList.module.scss' 
import Loader from '../../components/UI/Loader/Loader'
import {fetchQuizes, setDeletingQuizId, setDeletingQuizName} from '../../store/actions/quiz'
import Confirmation from '../../components/Confirmation/Confirmation'

class QuizList extends React.Component {
  deleteHandler(id, name) {
    this.props.setDeletingQuizId(id)
    this.props.setDeletingQuizName(name)
  }
  renderQuizes() {
    return this.props.quizes.map(quiz=> {
      return (
        <li
          key={quiz.id}
        >
          <Link to={'/quiz/' + quiz.id}>
            {'✔ ' + quiz.name}
          </Link>
          {
            this.props.userId && this.props.userId === quiz.userId 
              ? <button title="Delete quiz" onClick={() => this.deleteHandler(quiz.id, quiz.name)}>
                  <i 
                    className="fas fa-times"
                  />
                </button>
              : null
          }
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
          {this.props.deletingQuizId ? <Confirmation /> : null}
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
    loading: state.quiz.loading,
    deletingQuizId: state.quiz.deletingQuizId,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
    setDeletingQuizId: id => dispatch(setDeletingQuizId(id)),
    setDeletingQuizName: name => dispatch(setDeletingQuizName(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList) 
