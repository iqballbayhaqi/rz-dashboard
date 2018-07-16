// @flow
import api from '../api';

export const FETCH_POSTS__ERROR = 'FETCH_POSTS__ERROR';
export const FETCH_POSTS__LOADING = 'FETCH_POSTS__LOADING';
export const FETCH_POSTS__SUCCESS = 'FETCH_POSTS__SUCCESS';

export function fetchPostsError(error: Object) {
  return {
    type: FETCH_POSTS__ERROR,
    error,
  };
}

export function fetchPostsLoading(bool: boolean) {
  return {
    type: FETCH_POSTS__LOADING,
    loading: bool,
  };
}

export function fetchPostsSuccess(data: Object) {
  return {
    type: FETCH_POSTS__SUCCESS,
    payload: data,
  };
}

export default function fetchPosts(page: number, limit: number) {
  return (dispatch: Function) => {
    dispatch(fetchPostsLoading(true));

    const url = `posts?_page=${page + 1}&_limit=${limit}`;

    api.get(url)
      .then((response) => {
        dispatch(fetchPostsLoading(false));
        dispatch(fetchPostsError({}));
        return response;
      })
      .then((data) => {
        dispatch(fetchPostsSuccess(data));
      })
      .catch((error) => {
        if (error.message) {
          dispatch(fetchPostsLoading(false));
          dispatch(fetchPostsError(error));
        }
      });
  };
}
