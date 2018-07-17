// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  fetchSingleComment,
  newSingleComment,
  addSingleComment,
  updateSingleComment,
  hideSaveSingleCommentSuccessModal,
} from '../../actions/singleComment';
import { deleteComment } from '../../actions/comments';
import EditCommentForm from '../../components/EditCommentForm';

type Props = {
  classes: Object,
  comment: Object,
  fetchSingleComment: Function,
  newSingleComment: Function,
  addSingleComment: Function,
  updateSingleComment: Function,
  hideSaveSingleCommentSuccessModal: Function,
  deleteComment: Function,
  loading: boolean,
  showSaveSingleCommentSuccessModal: boolean,
  match: Object,
  // history: Object,
};

type State = {
  showConfirmDeleteModal: boolean,
  redirect: boolean,
};

const styles = {
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
};

class EditCommentContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showConfirmDeleteModal: false,
      redirect: false,
    };
  }

  componentWillMount() {
    const { match } = this.props;
    const { id, postId } = match.params;
    const { path } = match;
    if (path === '/comments/:id') {
      this.props.fetchSingleComment(id);
    }
    if (path === '/comments/new/posts/:postId') {
      this.props.newSingleComment(postId);
    }
  }

  handleSubmit = (comment) => {
    if (!comment.id) {
      return this.props.addSingleComment(comment);
    }
    return this.props.updateSingleComment(comment);
  }

  handleShowConfirmDeleteModal = () => {
    this.setState({
      showConfirmDeleteModal: true,
    });
  }

  handleCancelDelete = () => {
    this.setState({
      showConfirmDeleteModal: false,
    });
  }

  handleConfirmDelete = () => {
    const { id } = this.props.comment;
    if (id !== null) {
      this.props.deleteComment(id);
      this.setState({
        showConfirmDeleteModal: false,
        redirect: true,
      });
    }
  }

  render() {
    const { classes, comment, loading, showSaveSingleCommentSuccessModal } = this.props;
    const { showConfirmDeleteModal } = this.state;

    return (
      <Paper className={classes.root}>
        {
          this.state.redirect
            ? <Redirect to={`/posts/${comment.postId}/comments`} />
            : <EditCommentForm comment={comment} loading={loading} onSubmit={this.handleSubmit} onDelete={this.handleShowConfirmDeleteModal} />
        }
        <Dialog
          open={showConfirmDeleteModal}
          onClose={this.handleCancelDelete}
          disableBackdropClick
          disableEscapeKeyDown
          aria-labelledby="alert-dialog-title-confirm-delete"
          aria-describedby="alert-dialog-description-confirm-delete"
        >
          <DialogTitle id="alert-dialog-title-confirm-delete">
            Are You Sure?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description-confirm-delete">
              {'Deleted comment can\'t be restored'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleConfirmDelete} color="primary" autoFocus>
              {'Yes, I\'m Sure'}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={showSaveSingleCommentSuccessModal}
          disableBackdropClick
          disableEscapeKeyDown
          aria-labelledby="alert-dialog-title-save-success"
        >
          <DialogTitle id="alert-dialog-title-save-success">
            Save Success
          </DialogTitle>
          <DialogActions>
            <Button color="primary" onClick={this.props.hideSaveSingleCommentSuccessModal} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    comment: state.singleCommentReducer.comment,
    loading: state.singleCommentReducer.loading,
    error: state.singleCommentReducer.error,
    showSaveSingleCommentSuccessModal: state.singleCommentReducer.showSaveSingleCommentSuccessModal,
  };
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, {
    fetchSingleComment,
    newSingleComment,
    addSingleComment,
    updateSingleComment,
    deleteComment,
    hideSaveSingleCommentSuccessModal,
  }),
)(EditCommentContainer);
