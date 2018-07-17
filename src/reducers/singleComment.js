// @flow
import {
  FETCH_SINGLE_COMMENT__ERROR,
  FETCH_SINGLE_COMMENT__LOADING,
  FETCH_SINGLE_COMMENT__SUCCESS,
  UPDATE_SINGLE_COMMENT__SUCCESS,
  ADD_SINGLE_COMMENT__SUCCESS,
  NEW_SINGLE_COMMENT__SUCCESS,
  HIDE_SAVE_SINGLE_COMMENT_SUCCESS_MODAL,
} from '../actions/singleComment';

const defaultState = {
  comment: {},
  loading: false,
  error: {},
  deletedCommentId: null,
  showSaveSingleCommentSuccessModal: false,
};

const singleCommentReducer = (state: Object = defaultState, action: Object = {}) => {
  switch (action.type) {
    case FETCH_SINGLE_COMMENT__SUCCESS: {
      return {
        ...state,
        comment: action.payload.data,
      };
    }
    case FETCH_SINGLE_COMMENT__LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case FETCH_SINGLE_COMMENT__ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case UPDATE_SINGLE_COMMENT__SUCCESS: {
      return {
        ...state,
        comment: action.payload.data,
        showSaveSingleCommentSuccessModal: true,
      };
    }
    case ADD_SINGLE_COMMENT__SUCCESS: {
      return {
        ...state,
        comment: action.payload.data,
        showSaveSingleCommentSuccessModal: true,
      };
    }
    case NEW_SINGLE_COMMENT__SUCCESS: {
      return {
        ...state,
        comment: action.payload,
      };
    }
    case HIDE_SAVE_SINGLE_COMMENT_SUCCESS_MODAL: {
      return {
        ...state,
        showSaveSingleCommentSuccessModal: false,
      };
    }
    default:
      return state;
  }
};

export default singleCommentReducer;
