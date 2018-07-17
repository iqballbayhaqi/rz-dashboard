// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
import { fetchComments, deleteComment } from '../../actions/comments';

type Props = {
  classes: Object,
  id: number,
  comments: Array<Object>,
  count: number,
  loading: boolean,
  fetchComments: Function,
  deleteComment: Function,
  deletedCommentId: number,
};

type State = {
  page: number,
  limit: number,
  showConfirmDeleteModal: boolean,
  commentIdDelete: ?number,
};

const columnData = [
  { id: 1, numeric: true, disablePadding: false, label: 'Comments ID' },
  { id: 2, numeric: false, disablePadding: false, label: 'Name' },
  { id: 3, numeric: false, disablePadding: false, label: 'Email' },
  { id: 4, numeric: false, disablePadding: false, label: 'Body' },
  { id: 5, numeric: false, disablePadding: false, label: 'Action' },
];

const styles = theme => ({
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
    position: 'relative',
  },
  button: {
    margin: theme.spacing.unit,
    fontWeight: 'bold',
  },
  title: {
    marginLeft: 20,
    paddingTop: 20,
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

class PostCommentsContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      page: 0,
      limit: 10,
      showConfirmDeleteModal: false,
      commentIdDelete: null,
    };
  }

  componentWillMount() {
    const { id } = this.props;
    const { page, limit } = this.state;
    this.props.fetchComments(id, page, limit);
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props;
    const { page, limit } = this.state;
    if (prevProps.deletedCommentId !== this.props.deletedCommentId) {
      this.props.fetchComments(id, page, limit);
    }
  }

  handleChangePage = (event: Object, page: number) => {
    const { id } = this.props;
    const { limit } = this.state;
    this.props.fetchComments(id, page, limit);
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event: Object) => {
    const { id } = this.props;
    const { page } = this.state;
    this.props.fetchComments(id, page, event.target.value);
    this.setState({ limit: event.target.value });
  };

  handleShowConfirmDeleteModal = (id: number) => {
    this.setState({
      showConfirmDeleteModal: true,
      commentIdDelete: id,
    });
  }

  handleCancelDelete = () => {
    this.setState({
      showConfirmDeleteModal: false,
      commentIdDelete: null,
    });
  }

  handleConfirmDelete = (id: ?number) => {
    if (id !== null) {
      this.props.deleteComment(id);
      this.setState({ showConfirmDeleteModal: false });
    }
  }

  render() {
    const { classes, comments, loading, count, id } = this.props;
    const { limit, page, showConfirmDeleteModal, commentIdDelete } = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <div className={classes.addButtonWrapper}>
            <Button
              variant="contained"
              className={classes.button}
              color="secondary"
              component={Link}
              to={`/comments/new/posts/${id}`}
            >
              Add New Comment
            </Button>
          </div>
          {loading && <CircularProgress className={classes.progress} />}
          {id && (
            <h1 className={classes.title}>
              {`Post ID: ${id}`}
            </h1>
          )}
          <Table className={classes.table}>
            <TableHeadView columnData={columnData} />
            <TableBody>
              {comments.map(cell => (
                <TableRow key={cell.id}>
                  <TableCell numeric>
                    {cell.id}
                  </TableCell>
                  <TableCell>
                    {cell.name}
                  </TableCell>
                  <TableCell>
                    {cell.email}
                  </TableCell>
                  <TableCell>
                    {cell.body}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      className={classes.button}
                      variant="contained"
                      to={`/comments/${cell.id}`}
                      component={Link}
                    >
                      Edit
                    </Button>
                    <Button
                      color="primary"
                      className={classes.button}
                      variant="contained"
                      onClick={() => this.handleShowConfirmDeleteModal(cell.id)}
                    >
                      Delete
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
            <Button onClick={() => this.handleConfirmDelete(commentIdDelete)} color="primary" autoFocus>
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
    comments: state.commentsReducer.comments,
    deletedCommentId: state.commentsReducer.deletedCommentId,
    count: state.commentsReducer.count,
    loading: state.commentsReducer.loading,
    error: state.commentsReducer.error,
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { fetchComments, deleteComment }),
)(PostCommentsContainer);
