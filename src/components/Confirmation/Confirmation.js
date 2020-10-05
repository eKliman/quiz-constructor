import React from 'react'
import {connect} from 'react-redux'
import Backdrop from '../UI/Backdrop/Backdrop'
import Button from '../UI/Button/Button'
import classes from './Confirmation.module.scss'
import {fetchQuizes, setDeletingQuizId, setDeletingQuizName} from '../../store/actions/quiz'
import {deleteItem} from '../../utils/queries'

const Confirmation = props => {
  
  const cancelHandler = () => {
    props.setDeletingQuizId('')
    props.setDeletingQuizName('')
  }

  const deleteHandler = () => {
    deleteItem(props.deletingQuizId)
    props.fetchQuizes()
    cancelHandler()
  }

  return (
    <>
      <div className={classes.Confirmation}>
        <div className={classes.header}>
          <h2>Delete Confirmation</h2>
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <span>{props.deletingQuizName}</span>
        <div className={classes.buttons}>
          <Button
            type="cancel"
            onClick={deleteHandler}
          >
            Delete
          </Button>
          <Button
            type="primary"
            onClick={cancelHandler}
          >
            Cancel
          </Button>
        </div>
      </div>
      <Backdrop 
        onClick={cancelHandler}
        class={props.deletingQuizId ? 'confirm' : ''}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    deletingQuizId: state.quiz.deletingQuizId,
    deletingQuizName: state.quiz.deletingQuizName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
    setDeletingQuizId: () => dispatch(setDeletingQuizId('')),
    setDeletingQuizName: () => dispatch(setDeletingQuizName(''))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)