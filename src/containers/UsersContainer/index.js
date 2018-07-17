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
import fetchUsers from '../../actions/users';
import BaseLayout from '../../components/BaseLayout';

type Props = {
  classes: Object,
  users: Array<Object>,
  count: number,
  loading: boolean,
  fetchUsers: Function,
};

type State = {
  page: number,
  limit: number,
};

const columnData = [
  { id: 1, numeric: true, disablePadding: false, label: 'User ID' },
  { id: 2, numeric: false, disablePadding: false, label: 'Name' },
  { id: 3, numeric: false, disablePadding: false, label: 'Username' },
  { id: 4, numeric: false, disablePadding: false, label: 'Email' },
  { id: 5, numeric: false, disablePadding: false, label: 'Action' },
];

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit,
    fontWeight: 'bold',
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

class UsersContainer extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      limit: 10,
    };
  }

  componentWillMount() {
    const { page, limit } = this.state;
    this.props.fetchUsers(page, limit);
  }

  handleChangePage = (event, page) => {
    const { limit } = this.state;
    this.props.fetchUsers(page, limit);
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    const { page } = this.state;
    this.props.fetchUsers(page, event.target.value);
    this.setState({ limit: event.target.value });
  };

  render() {
    const { classes, users, loading, count } = this.props;
    const { limit, page } = this.state;

    return (
      <BaseLayout
        title="RZ Dashboard - Users"
        description="Dashboard Example built with React JS"
        canonical="/users"
      >
        <Paper className={classes.root}>
          <TableToolbar title="Users" />
          <div className={classes.tableWrapper}>
            {loading && <CircularProgress className={classes.progress} />}
            <Table className={classes.table}>
              <TableHeadView columnData={columnData} />
              <TableBody>
                {users.map(cell => (
                  <TableRow key={cell.id}>
                    <TableCell numeric>
                      {cell.id}
                    </TableCell>
                    <TableCell>
                      {cell.name}
                    </TableCell>
                    <TableCell>
                      {cell.username}
                    </TableCell>
                    <TableCell>
                      {cell.email}
                    </TableCell>
                    <TableCell>
                      <Button color="primary" className={classes.button} variant="contained" to={`/users/${cell.id}/posts`} component={Link}>
                        View Posts
                      </Button>
                      <Button color="primary" className={classes.button} variant="contained" to={`/users/${cell.id}/albums`} component={Link}>
                        View Albums
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
      </BaseLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.usersReducer.users,
    count: state.usersReducer.count,
    loading: state.usersReducer.loading,
    error: state.usersReducer.error,
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { fetchUsers }),
)(UsersContainer);
