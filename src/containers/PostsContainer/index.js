// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TableHeadView from '../../components/Table/TableHeadView';
import TableToolbar from '../../components/Table/TableToolbar';
import { fetchPosts, fetchPostsOfUser, deletePost } from '../../actions/posts';

type Props = {
  classes: Object,
  posts: Array<Object>,
  count: number,
  loading: boolean,
  fetchPosts: Function,
  fetchPostsOfUser: Function,
  deletePost: Function,
  deletedPostId: number,
  match: Object,
};

type State = {
  page: number,
  limit: number,
  showConfirmDeleteModal: boolean,
  postIdDelete: ?number,
};

const columnData = [
  { id: 1, numeric: true, disablePadding: false, label: 'Post ID' },
  { id: 2, numeric: false, disablePadding: false, label: 'Title' },
  { id: 5, numeric: false, disablePadding: false, label: 'Action' },
];

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
    position: 'relative',
  },
  addButtonWrapper: {
    textAlign: 'right',
    marginRight: 20,
    paddingTop: 20,
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});

class PostsContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      page: 0,
      limit: 10,
      showConfirmDeleteModal: false,
      postIdDelete: null,
    };
  }

  componentWillMount() {
    const { page, limit } = this.state;
    const { path, params } = this.props.match;
    if (path === '/posts') {
      this.props.fetchPosts(page, limit);
    }
    if (path === '/users/:id/posts') {
      this.props.fetchPostsOfUser(page, limit, params.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { page, limit } = this.state;
    const { path, params } = this.props.match;
    if (prevProps.deletedPostId !== this.props.deletedPostId) {
      if (path === '/posts') {
        this.props.fetchPosts(page, limit);
      }
      if (path === '/users/:id/posts') {
        this.props.fetchPostsOfUser(page, limit, params.id);
      }
    }
  }

  handleChangePage = (event: Object, page: number) => {
    const { limit } = this.state;
    const { path, params } = this.props.match;
    if (path === '/posts') {
      this.props.fetchPosts(page, limit);
    }
    if (path === '/users/:id/posts') {
      this.props.fetchPostsOfUser(page, limit, params.id);
    }
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event: Object) => {
    const { page } = this.state;
    const { path, params } = this.props.match;
    if (path === '/posts') {
      this.props.fetchPosts(page, event.target.value);
    }
    if (path === '/users/:id/posts') {
      this.props.fetchPostsOfUser(page, event.target.value, params.id);
    }
    this.setState({ limit: event.target.value });
  };

  handleShowConfirmDeleteModal = (id: number) => {
    this.setState({
      showConfirmDeleteModal: true,
      postIdDelete: id,
    });
  }

  handleCancelDelete = () => {
    this.setState({
      showConfirmDeleteModal: false,
      postIdDelete: null,
    });
  }

  handleConfirmDelete = (id: number) => {
    if (id !== null) {
      this.props.deletePost(id);
      this.setState({ showConfirmDeleteModal: false });
    }
  }

  handleTitle = () => {
    const { path, params } = this.props.match;
    if (path === '/posts') {
      return 'Posts';
    }
    if (path === '/users/:id/posts') {
      return `Posts of User ID ${params.id}`;
    }
    return '';
  }

  render() {
    const { classes, posts, loading, count } = this.props;
    const { limit, page, showConfirmDeleteModal, postIdDelete } = this.state;
    // console.log(this.props);

    return (
      <Paper className={classes.root}>
        <div className={classes.addButtonWrapper}>
          <Button variant="contained" color="primary" component={Link} to="/posts/new">
            Add New Post
          </Button>
        </div>
        <TableToolbar title={this.handleTitle()} />
        <div className={classes.tableWrapper}>
          {loading && <CircularProgress className={classes.progress} />}
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHeadView columnData={columnData} />
            <TableBody>
              {posts.map(cell => (
                <TableRow key={cell.id}>
                  <TableCell numeric>
                    {cell.id}
                  </TableCell>
                  <TableCell>
                    {cell.title}
                  </TableCell>
                  <TableCell>
                    <Button color="primary" to={`/posts/${cell.id}`} component={Link}>
                      Edit
                    </Button>
                    <Button color="primary" onClick={() => this.handleShowConfirmDeleteModal(cell.id)}>
                      Delete
                    </Button>
                    <Button color="primary" to={`/posts/${cell.id}/comments`} component={Link}>
                      View Comments
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={count}
          rowsPerPage={limit}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <Dialog
          open={showConfirmDeleteModal}
          onClose={this.handleCancelDelete}
          disableBackdropClick
          disableEscapeKeyDown
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are You Sure?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {'Deleted post can\'t be restored'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleConfirmDelete(postIdDelete)} color="primary" autoFocus>
              {'Yes, I\'m Sure'}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.postsReducer.posts,
    deletedPostId: state.postsReducer.deletedPostId,
    count: state.postsReducer.count,
    loading: state.postsReducer.loading,
    error: state.postsReducer.error,
  };
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, { fetchPosts, fetchPostsOfUser, deletePost }),
)(PostsContainer);
