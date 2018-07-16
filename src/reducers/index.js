// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usersReducer from './users';
import postsReducer from './posts';
import singlePostReducer from './singlePost';
import commentsReducer from './comments';

export default combineReducers({
  form: formReducer,
  usersReducer,
  postsReducer,
  singlePostReducer,
  commentsReducer,
});
