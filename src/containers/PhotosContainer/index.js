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
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Lazy } from 'react-lazy';

import TableHeadView from '../../components/Table/TableHeadView';
import TableToolbar from '../../components/Table/TableToolbar';
import { fetchPhotos, fetchPhotosOfAlbum } from '../../actions/photos';

type Props = {
  classes: Object,
  photos: Array<Object>,
  count: number,
  loading: boolean,
  fetchPhotos: Function,
  fetchPhotosOfAlbum: Function,
  match: Object,
};

type State = {
  page: number,
  limit: number,
};

const columnData = [
  { id: 1, numeric: true, disablePadding: false, label: 'Photo ID' },
  { id: 2, numeric: false, disablePadding: false, label: 'Image' },
  { id: 3, numeric: false, disablePadding: false, label: 'Title' },
  { id: 4, numeric: false, disablePadding: false, label: 'Action' },
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
  image: {
    padding: 20,
    maxWidth: 120,
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});

class PhotosContainer extends React.Component<Props, State> {
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
    if (path === '/photos') {
      this.props.fetchPhotos(page, limit);
    }
    if (path === '/albums/:id/photos') {
      this.props.fetchPhotosOfAlbum(page, limit, params.id);
    }
  }

  handleChangePage = (event: Object, page: number) => {
    const { limit } = this.state;
    const { path, params } = this.props.match;
    if (path === '/photos') {
      this.props.fetchPhotos(page, limit);
    }
    if (path === '/albums/:id/photos') {
      this.props.fetchPhotosOfAlbum(page, limit, params.id);
    }
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event: Object) => {
    const { page } = this.state;
    const { path, params } = this.props.match;
    if (path === '/photos') {
      this.props.fetchPhotos(page, event.target.value);
    }
    if (path === '/albums/:id/photos') {
      this.props.fetchPhotosOfAlbum(page, event.target.value, params.id);
    }
    this.setState({ limit: event.target.value });
  };

  handleTitle = () => {
    const { path, params } = this.props.match;
    if (path === '/photos') {
      return 'Photos';
    }
    if (path === '/albums/:id/photos') {
      return `Photos of Album ID ${params.id}`;
    }
    return '';
  }

  render() {
    const { classes, photos, loading, count } = this.props;
    const { limit, page } = this.state;

    return (
      <Paper className={classes.root}>
        <TableToolbar title={this.handleTitle()} />
        <div className={classes.tableWrapper}>
          {loading && <CircularProgress className={classes.progress} />}
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHeadView columnData={columnData} />
            <TableBody>
              {photos.map(cell => (
                <TableRow key={cell.id}>
                  <TableCell numeric>
                    {cell.id}
                  </TableCell>
                  <TableCell>
                    <ButtonBase to={`/photos/${cell.id}`} component={Link}>
                      <Lazy ltIE9 className={classes.image}>
                        <img src={cell.thumbnailUrl} alt={cell.title} className={classes.image} />
                      </Lazy>
                    </ButtonBase>
                  </TableCell>
                  <TableCell>
                    {cell.title}
                  </TableCell>
                  <TableCell>
                    <Button color="primary" to={`/photos/${cell.id}`} component={Link}>
                      View Photo
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
    photos: state.photosReducer.photos,
    count: state.photosReducer.count,
    loading: state.photosReducer.loading,
    error: state.photosReducer.error,
  };
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, { fetchPhotos, fetchPhotosOfAlbum }),
)(PhotosContainer);
