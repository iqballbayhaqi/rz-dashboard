// @flow
import { SubmissionError } from 'redux-form';

import api from '../api';

export const FETCH_SINGLE_POST__ERROR = 'FETCH_SINGLE_POST__ERROR';
export const FETCH_SINGLE_POST__LOADING = 'FETCH_SINGLE_POST__LOADING';
export const FETCH_SINGLE_POST__SUCCESS = 'FETCH_SINGLE_POST__SUCCESS';
export const UPDATE_SINGLE_POST__SUCCESS = 'UPDATE_SINGLE_POST_SUCCESS';
export const ADD_SINGLE_POST__SUCCESS = 'ADD_SINGLE_POST_SUCCESS';
export const NEW_SINGLE_POST__SUCCESS = 'NEW_SINGLE_POST_SUCCESS';
export const HIDE_SAVE_SINGLE_POST_SUCCESS_MODAL = 'HIDE_SAVE_SINGLE_POST_SUCCESS_MODAL';

export const fetchSinglePostError = (error: Object) => ({
  type: FETCH_SINGLE_POST__ERROR,
  error,
});

export const fetchSinglePostLoading = (bool: boolean) => ({
  type: FETCH_SINGLE_POST__LOADING,
  loading: bool,
});

export const fetchSinglePostSuccess = (data: Object) => ({
  type: FETCH_SINGLE_POST__SUCCESS,
  payload: data,
});

export const updateSinglePostSuccess = (data: Object) => ({
  type: UPDATE_SINGLE_POST__SUCCESS,
  payload: data,
});

export const addSinglePostSuccess = (data: Object) => ({
  type: ADD_SINGLE_POST__SUCCESS,
  payload: data,
});

export const newSinglePost = () => (dispatch: Function) => {
  dispatch({
    type: NEW_SINGLE_POST__SUCCESS,
    payload: { userId: 1 }, // Dummy userId, only for simulation
  });
};

export const hideSaveSinglePostSuccessModal = () => (dispatch: Function) => {
  dispatch({
    type: HIDE_SAVE_SINGLE_POST_SUCCESS_MODAL,
    payload: false,
  });
};

export const fetchSinglePost = (id: number) => (dispatch: Function) => {
  dispatch(fetchSinglePostLoading(true));

  const url = `posts/${id}`;

  api.get(url)
    .then((response) => {
      dispatch(fetchSinglePostLoading(false));
      return response;
    })
    .then((data) => {
      dispatch(fetchSinglePostSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchSinglePostLoading(false));
      dispatch(fetchSinglePostError(error));
    });
};

export const updateSinglePost = (post: Object) => (dispatch: Function) => {
  dispatch(fetchSinglePostLoading(true));

  const url = `posts/${post.id}`;

  api.put(url, post)
    .then((response) => {
      dispatch(fetchSinglePostLoading(false));
      return response;
    })
    .then((data) => {
      dispatch(updateSinglePostSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchSinglePostLoading(false));
      dispatch(fetchSinglePostError(error));
      throw new SubmissionError(error);
    });
};

export const addSinglePost = (post: Object) => (dispatch: Function) => {
  dispatch(fetchSinglePostLoading(true));

  const url = 'posts';

  api.post(url, post)
    .then((response) => {
      dispatch(fetchSinglePostLoading(false));
      return response;
    })
    .then((data) => {
      dispatch(addSinglePostSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchSinglePostLoading(false));
      dispatch(fetchSinglePostError(error));
      throw new SubmissionError(error);
    });
};
