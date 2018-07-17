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

import TableHeadView from '../../components/Table/TableHeadView';
import TableToolbar from '../../components/Table/TableToolbar';
import { fetchAlbums, fetchAlbumsOfUser } from '../../actions/albums';
import BaseLayout from '../../components/BaseLayout';

type Props = {
  classes: Object,
  albums: Array<Object>,
  count: number,
  loading: boolean,
  fetchAlbums: Function,
  fetchAlbumsOfUser: Function,
  match: Object,
};

type State = {
  page: number,
  limit: number,
};

const columnData = [
  { id: 1, numeric: true, disablePadding: false, label: 'Album ID' },
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
  button: {
    margin: theme.spacing.unit,
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

class AlbumsContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      page: 0,
      limit: 10,
    };
  }

  componentWillMount() {
    const { page, limit } = this.state;
    const { path, params } = this.props.match;
    if (path === '/albums') {
      this.props.fetchAlbums(page, limit);
    }
    if (path === '/users/:id/albums') {
      this.props.fetchAlbumsOfUser(page, limit, params.id);
    }
  }

  handleChangePage = (event: Object, page: number) => {
    const { limit } = this.state;
    const { path, params } = this.props.match;
    if (path === '/albums') {
      this.props.fetchAlbums(page, limit);
    }
    if (path === '/users/:id/albums') {
      this.props.fetchAlbumsOfUser(page, limit, params.id);
    }
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event: Object) => {
    const { page } = this.state;
    const { path, params } = this.props.match;
    if (path === '/albums') {
      this.props.fetchAlbums(page, event.target.value);
    }
    if (path === '/users/:id/albums') {
      this.props.fetchAlbumsOfUser(page, event.target.value, params.id);
    }
    this.setState({ limit: event.target.value });
  };

  handleTitle = () => {
    const { path, params } = this.props.match;
    if (path === '/albums') {
      return 'Albums';
    }
    if (path === '/users/:id/albums') {
      return `Albums of User ID ${params.id}`;
    }
    return '';
  }

  render() {
    const { classes, albums, loading, count } = this.props;
    const { limit, page } = this.state;

    return (
      <BaseLayout
        title="RZ Dashboard - Albums"
        description="Dashboard Example built with React JS"
        canonical="/albums"
      >
        <Paper className={classes.root}>
          <TableToolbar title={this.handleTitle()} />
          <div className={classes.tableWrapper}>
            {loading && <CircularProgress className={classes.progress} />}
            <Table className={classes.table}>
              <TableHeadView columnData={columnData} />
              <TableBody>
                {albums.map(cell => (
                  <TableRow key={cell.id}>
                    <TableCell numeric>
                      {cell.id}
                    </TableCell>
                    <TableCell>
                      {cell.title}
                    </TableCell>
                    <TableCell>
                      <Button color="primary" className={classes.button} variant="contained" to={`/albums/${cell.id}/photos`} component={Link}>
                        View Photos
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
    albums: state.albumsReducer.albums,
    count: state.albumsReducer.count,
    loading: state.albumsReducer.loading,
    error: state.albumsReducer.error,
  };
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, { fetchAlbums, fetchAlbumsOfUser }),
)(AlbumsContainer);
