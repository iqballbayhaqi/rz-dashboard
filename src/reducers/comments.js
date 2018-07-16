// @flow
import {
  FETCH_COMMENTS__ERROR,
  FETCH_COMMENTS__LOADING,
  FETCH_COMMENTS__SUCCESS,
  DELETE_COMMENT_SUCCESS,
} from '../actions/comments';

const defaultState = {
  comments: [],
  count: 0,
  loading: false,
  error: {},
  deletedCommentId: null,
};

const commentsReducer = (state: Object = defaultState, action: Object = {}) => {
  switch (action.type) {
    case FETCH_COMMENTS__SUCCESS: {
      const { 'x-total-count': count } = action.payload.headers;
      return {
        ...state,
        comments: action.payload.data,
        count: parseInt(count, 10),
      };
    }
    case FETCH_COMMENTS__LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case FETCH_COMMENTS__ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case DELETE_COMMENT_SUCCESS: {
      const id = action.payload;
      return {
        ...state,
        comments: state.comments.filter(item => item.id !== id),
        deletedCommentId: id,
      };
    }
    default:
      return state;
  }
};

export default commentsReducer;
