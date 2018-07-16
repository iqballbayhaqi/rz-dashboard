// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  addSinglePost,
  updateSinglePost,
  hideSaveSinglePostSuccessModal,
} from '../../actions/singlePost';
import { deletePost } from '../../actions/posts';
import EditPostForm from '../../components/EditPostForm';

type Props = {
  classes: Object,
  post: Object,
  addSinglePost: Function,
  updateSinglePost: Function,
  hideSaveSinglePostSuccessModal: Function,
  deletePost: Function,
  loading: boolean,
  showSaveSinglePostSuccessModal: boolean,
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

class EditPostContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showConfirmDeleteModal: false,
      redirect: false,
    };
  }

  handleSubmit = (post) => {
    if (!post.id) {
      return this.props.addSinglePost(post);
    }
    return this.props.updateSinglePost(post);
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
    const { id } = this.props.post;
    if (id !== null) {
      this.props.deletePost(id);
      this.setState({
        showConfirmDeleteModal: false,
        redirect: true,
      });
    }
  }

  render() {
    const { classes, post, loading, showSaveSinglePostSuccessModal } = this.props;
    const { showConfirmDeleteModal } = this.state;

    return (
      <Paper className={classes.root}>
        {
          this.state.redirect
            ? <Redirect to="/posts" />
            : <EditPostForm post={post} loading={loading} onSubmit={this.handleSubmit} onDelete={this.handleShowConfirmDeleteModal} />
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
              {'Deleted post can\'t be restored'}
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
          open={showSaveSinglePostSuccessModal}
          disableBackdropClick
          disableEscapeKeyDown
          aria-labelledby="alert-dialog-title-save-success"
        >
          <DialogTitle id="alert-dialog-title-save-success">
            Save Success
          </DialogTitle>
          <DialogActions>
            <Button color="primary" onClick={this.props.hideSaveSinglePostSuccessModal} autoFocus>
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
    deletedPostId: state.singlePostReducer.deletedPostId,
    error: state.singlePostReducer.error,
    showSaveSinglePostSuccessModal: state.singlePostReducer.showSaveSinglePostSuccessModal,
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { addSinglePost, updateSinglePost, deletePost, hideSaveSinglePostSuccessModal }),
)(EditPostContainer);
