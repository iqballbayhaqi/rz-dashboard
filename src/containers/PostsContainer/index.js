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

import TableHeadView from '../../components/Table/TableHeadView';
import TableToolbar from '../../components/Table/TableToolbar';
import fetchPosts from '../../actions/posts';

type Props = {
  classes: Object,
  posts: Array<Object>,
  count: number,
  loading: boolean,
  fetchPosts: Function,
};

type State = {
  page: number,
  limit: number,
};

const columnData = [
  { id: 1, numeric: true, disablePadding: false, label: 'Post ID' },
  { id: 2, numeric: false, disablePadding: false, label: 'Title' },
  { id: 5, numeric: false, disablePadding: false, label: 'Action' },
];

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});

class PostsContainer extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      limit: 10,
    };
  }

  componentWillMount() {
    const { page, limit } = this.state;
    this.props.fetchPosts(page, limit);
  }

  handleChangePage = (event, page) => {
    const { limit } = this.state;
    this.props.fetchPosts(page, limit);
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    const { page } = this.state;
    this.props.fetchPosts(page, event.target.value);
    this.setState({ limit: event.target.value });
  };

  render() {
    const { classes, posts, loading, count } = this.props;
    const { limit, page } = this.state;

    return (
      <Paper className={classes.root}>
        <TableToolbar title="Posts" />
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
                    <Button color="primary">
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
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.postsReducer.posts,
    count: state.postsReducer.count,
    loading: state.postsReducer.loading,
    error: state.postsReducer.error,
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { fetchPosts }),
)(PostsContainer);
