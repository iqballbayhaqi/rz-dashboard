// @flow
import { SubmissionError } from 'redux-form';

import api from '../api';

export const FETCH_SINGLE_COMMENT__ERROR = 'FETCH_SINGLE_COMMENT__ERROR';
export const FETCH_SINGLE_COMMENT__LOADING = 'FETCH_SINGLE_COMMENT__LOADING';
export const FETCH_SINGLE_COMMENT__SUCCESS = 'FETCH_SINGLE_COMMENT__SUCCESS';
export const UPDATE_SINGLE_COMMENT__SUCCESS = 'UPDATE_SINGLE_COMMENT_SUCCESS';
export const ADD_SINGLE_COMMENT__SUCCESS = 'ADD_SINGLE_COMMENT_SUCCESS';
export const NEW_SINGLE_COMMENT__SUCCESS = 'NEW_SINGLE_COMMENT_SUCCESS';
export const HIDE_SAVE_SINGLE_COMMENT_SUCCESS_MODAL = 'HIDE_SAVE_SINGLE_COMMENT_SUCCESS_MODAL';

export const fetchSingleCommentError = (error: Object) => ({
  type: FETCH_SINGLE_COMMENT__ERROR,
  error,
});

export const fetchSingleCommentLoading = (bool: boolean) => ({
  type: FETCH_SINGLE_COMMENT__LOADING,
  loading: bool,
});

export const fetchSingleCommentSuccess = (data: Object) => ({
  type: FETCH_SINGLE_COMMENT__SUCCESS,
  payload: data,
});

export const updateSingleCommentSuccess = (data: Object) => ({
  type: UPDATE_SINGLE_COMMENT__SUCCESS,
  payload: data,
});

export const addSingleCommentSuccess = (data: Object) => ({
  type: ADD_SINGLE_COMMENT__SUCCESS,
  payload: data,
});

export const newSingleComment = (postId: number) => (dispatch) => {
  dispatch({
    type: NEW_SINGLE_COMMENT__SUCCESS,
    payload: { postId }, // Dummy userId, only for simulation
  });
};

export const hideSaveSingleCommentSuccessModal = () => (dispatch) => {
  dispatch({
    type: HIDE_SAVE_SINGLE_COMMENT_SUCCESS_MODAL,
    payload: false,
  });
};

export const fetchSingleComment = (id: number) => (dispatch: Function) => {
  dispatch(fetchSingleCommentLoading(true));

  const url = `comments/${id}`;

  api.get(url)
    .then((response) => {
      dispatch(fetchSingleCommentLoading(false));
      return response;
    })
    .then((data) => {
      dispatch(fetchSingleCommentSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchSingleCommentLoading(false));
      dispatch(fetchSingleCommentError(error));
    });
};

export const updateSingleComment = (comment: Object) => (dispatch: Function) => {
  dispatch(fetchSingleCommentLoading(true));

  const url = `comments/${comment.id}`;

  api.put(url, comment)
    .then((response) => {
      dispatch(fetchSingleCommentLoading(false));
      return response;
    })
    .then((data) => {
      dispatch(updateSingleCommentSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchSingleCommentLoading(false));
      dispatch(fetchSingleCommentError(error));
      throw new SubmissionError(error);
    });
};

export const addSingleComment = (comment: Object) => (dispatch: Function) => {
  dispatch(fetchSingleCommentLoading(true));

  const url = 'comments';

  api.post(url, comment)
    .then((response) => {
      dispatch(fetchSingleCommentLoading(false));
      return response;
    })
    .then((data) => {
      dispatch(addSingleCommentSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchSingleCommentLoading(false));
      dispatch(fetchSingleCommentError(error));
      throw new SubmissionError(error);
    });
};
