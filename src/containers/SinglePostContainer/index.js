// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { fetchSinglePost, newSinglePost } from '../../actions/singlePost';
import PostCommentsContainer from './PostCommentsContainer';
import EditPostContainer from './EditPostContainer';

type Props = {
  classes: Object,
  match: Object,
  history: Object,
  fetchSinglePost: Function,
  newSinglePost: Function,
  post: Object,
  loading: boolean,
};

type State = {};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
});

class SinglePostContainer extends React.PureComponent<Props, State> {
  componentWillMount() {
    const { id } = this.props.match.params;
    if (id && id !== 'new') {
      this.props.fetchSinglePost(id);
    } else {
      this.props.newSinglePost();
    }
  }

  handleChangeTab = (event, value) => {
    this.props.history.push(value);
  };

  render() {
    const {
      classes,
      match: { params: { id } },
      history: { location: { pathname } },
      post,
      loading,
    } = this.props;

    console.log(this.props);

    return (
      <React.Fragment>
        <Paper className={classes.root}>
          {id !== 'new' && (
          <Tabs
            value={pathname}
            onChange={this.handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Edit Post" value={`/posts/${id}`} />
            <Tab label="Comments" value={`/posts/${id}/comments`} />
          </Tabs>
          )}
          {pathname === `/posts/${id}` && <EditPostContainer post={post} loading={loading} />}
          {post.id && pathname === `/posts/${id}/comments` && <PostCommentsContainer post={post} />}
        </Paper>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.singlePostReducer.post,
    loading: state.singlePostReducer.loading,
    error: state.singlePostReducer.error,
  };
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, { fetchSinglePost, newSinglePost }),
)(SinglePostContainer);
