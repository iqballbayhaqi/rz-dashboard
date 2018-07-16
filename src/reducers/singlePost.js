// @flow
import {
  FETCH_SINGLE_POST__ERROR,
  FETCH_SINGLE_POST__LOADING,
  FETCH_SINGLE_POST__SUCCESS,
  UPDATE_SINGLE_POST__SUCCESS,
  ADD_SINGLE_POST__SUCCESS,
  NEW_SINGLE_POST__SUCCESS,
  HIDE_SAVE_SINGLE_POST_SUCCESS_MODAL,
} from '../actions/singlePost';

const defaultState = {
  post: {},
  loading: false,
  error: {},
  deletedPostId: null,
  showSaveSinglePostSuccessModal: false,
};

const singlePostReducer = (state: Object = defaultState, action: Object = {}) => {
  switch (action.type) {
    case FETCH_SINGLE_POST__SUCCESS: {
      return {
        ...state,
        post: action.payload.data,
      };
    }
    case FETCH_SINGLE_POST__LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case FETCH_SINGLE_POST__ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case UPDATE_SINGLE_POST__SUCCESS: {
      return {
        ...state,
        post: action.payload.data,
        showSaveSinglePostSuccessModal: true,
      };
    }
    case ADD_SINGLE_POST__SUCCESS: {
      return {
        ...state,
        post: action.payload.data,
        showSaveSinglePostSuccessModal: true,
      };
    }
    case NEW_SINGLE_POST__SUCCESS: {
      return {
        ...state,
        post: action.payload,
      };
    }
    case HIDE_SAVE_SINGLE_POST_SUCCESS_MODAL: {
      return {
        ...state,
        showSaveSinglePostSuccessModal: false,
      };
    }
    default:
      return state;
  }
};

export default singlePostReducer;
