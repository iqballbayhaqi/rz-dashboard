// @flow
import api from '../api';

export const FETCH_POSTS__ERROR = 'FETCH_POSTS__ERROR';
export const FETCH_POSTS__LOADING = 'FETCH_POSTS__LOADING';
export const FETCH_POSTS__SUCCESS = 'FETCH_POSTS__SUCCESS';
export const FETCH_POST__ERROR = 'FETCH_POST__ERROR';
export const FETCH_POST__LOADING = 'FETCH_POST__LOADING';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';

export const fetchPostsError = (error: Object) => ({
  type: FETCH_POSTS__ERROR,
  error,
});

export const fetchPostsLoading = (bool: boolean) => ({
  type: FETCH_POSTS__LOADING,
  loading: bool,
});

export const fetchPostsSuccess = (data: Object) => ({
  type: FETCH_POSTS__SUCCESS,
  payload: data,
});

export const deletePostSuccess = id => ({
  type: DELETE_POST_SUCCESS,
  payload: id,
});

export const fetchPosts = (page: number, limit: number) => (dispatch: Function) => {
  dispatch(fetchPostsLoading(true));

  const url = `posts?_page=${page + 1}&_limit=${limit}`;

  api.get(url)
    .then((response) => {
      dispatch(fetchPostsLoading(false));
      return response;
    })
    .then((data) => {
      dispatch(fetchPostsSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchPostsLoading(false));
      dispatch(fetchPostsError(error));
    });
};

export const deletePost = (id: number) => (dispatch: Function) => {
  dispatch(fetchPostsLoading(true));

  const url = `posts/${id}`;

  api.delete(url)
    .then((response) => {
      dispatch(fetchPostsLoading(false));
      return response;
    })
    .then(() => {
      dispatch(deletePostSuccess(id));
    })
    .catch((error) => {
      dispatch(fetchPostsLoading(false));
      dispatch(fetchPostsError(error));
    });
};
