// @flow
import api from '../api';

export const FETCH_ALBUMS__ERROR = 'FETCH_ALBUMS__ERROR';
export const FETCH_ALBUMS__LOADING = 'FETCH_ALBUMS__LOADING';
export const FETCH_ALBUMS__SUCCESS = 'FETCH_ALBUMS__SUCCESS';

export const fetchAlbumsError = (error: Object) => ({
  type: FETCH_ALBUMS__ERROR,
  error,
});

export const fetchAlbumsLoading = (bool: boolean) => ({
  type: FETCH_ALBUMS__LOADING,
  loading: bool,
});

export const fetchAlbumsSuccess = (data: Object) => ({
  type: FETCH_ALBUMS__SUCCESS,
  payload: data,
});

export const fetchAlbums = (page: number, limit: number) => (dispatch: Function) => {
  dispatch(fetchAlbumsLoading(true));

  const url = `albums?_page=${page + 1}&_limit=${limit}&_sort=id&_order=desc`;

  api.get(url)
    .then((response) => {
      dispatch(fetchAlbumsLoading(false));
      return response;
    })
    .then((data) => {
      dispatch(fetchAlbumsSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchAlbumsLoading(false));
      dispatch(fetchAlbumsError(error));
    });
};

export const fetchAlbumsOfUser = (page: number, limit: number, userId: number) => (dispatch: Function) => {
  dispatch(fetchAlbumsLoading(true));

  const url = `users/${userId}/albums?_page=${page + 1}&_limit=${limit}&_sort=id&_order=desc`;

  api.get(url)
    .then((response) => {
      dispatch(fetchAlbumsLoading(false));
      return response;
    })
    .then((data) => {
      dispatch(fetchAlbumsSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchAlbumsLoading(false));
      dispatch(fetchAlbumsError(error));
    });
};
