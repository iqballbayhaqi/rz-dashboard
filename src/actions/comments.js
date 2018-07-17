// @flow
import api from '../api';

export const FETCH_COMMENTS__ERROR = 'FETCH_COMMENTS__ERROR';
export const FETCH_COMMENTS__LOADING = 'FETCH_COMMENTS__LOADING';
export const FETCH_COMMENTS__SUCCESS = 'FETCH_COMMENTS__SUCCESS';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';

export const fetchCommentsError = (error: Object) => ({
  type: FETCH_COMMENTS__ERROR,
  error,
});

export const fetchCommentsLoading = (bool: boolean) => ({
  type: FETCH_COMMENTS__LOADING,
  loading: bool,
});

export const fetchCommentsSuccess = (data: Object) => ({
  type: FETCH_COMMENTS__SUCCESS,
  payload: data,
});

export const deleteCommentSuccess = (id: number) => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: id,
});

export const fetchComments = (id: number, page: number, limit: number) => (dispatch: Function) => {
  dispatch(fetchCommentsLoading(true));

  const url = `posts/${id}/comments?_page=${page + 1}&_limit=${limit}&_sort=id&_order=desc`;

  api.get(url)
    .then((response) => {
      dispatch(fetchCommentsLoading(false));
      return response;
    })
    .then((data) => {
      dispatch(fetchCommentsSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchCommentsLoading(false));
      dispatch(fetchCommentsError(error));
    });
};

export const deleteComment = (id: number) => (dispatch: Function) => {
  dispatch(fetchCommentsLoading(true));

  const url = `comments/${id}`;

  api.delete(url)
    .then((response) => {
      dispatch(fetchCommentsLoading(false));
      return response;
    })
    .then(() => {
      dispatch(deleteCommentSuccess(id));
    })
    .catch((error) => {
      dispatch(fetchCommentsLoading(false));
      dispatch(fetchCommentsError(error));
    });
};
