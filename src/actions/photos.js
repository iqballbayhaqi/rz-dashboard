// @flow
import api from '../api';

export const FETCH_PHOTOS__ERROR = 'FETCH_PHOTOS__ERROR';
export const FETCH_PHOTOS__LOADING = 'FETCH_PHOTOS__LOADING';
export const FETCH_PHOTOS__SUCCESS = 'FETCH_PHOTOS__SUCCESS';

export const fetchPhotosError = (error: Object) => ({
  type: FETCH_PHOTOS__ERROR,
  error,
});

export const fetchPhotosLoading = (bool: boolean) => ({
  type: FETCH_PHOTOS__LOADING,
  loading: bool,
});

export const fetchPhotosSuccess = (data: Object) => ({
  type: FETCH_PHOTOS__SUCCESS,
  payload: data,
});

export const fetchPhotos = (page: number, limit: number) => (dispatch: Function) => {
  dispatch(fetchPhotosLoading(true));

  const url = `photos?_page=${page + 1}&_limit=${limit}&_sort=id&_order=desc`;

  api.get(url)
    .then((response) => {
      dispatch(fetchPhotosLoading(false));
      return response;
    })
    .then((data) => {
      dispatch(fetchPhotosSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchPhotosLoading(false));
      dispatch(fetchPhotosError(error));
    });
};

export const fetchPhotosOfAlbum = (page: number, limit: number, albumId: number) => (dispatch: Function) => {
  dispatch(fetchPhotosLoading(true));

  const url = `albums/${albumId}/photos?_page=${page + 1}&_limit=${limit}&_sort=id&_order=desc`;

  api.get(url)
    .then((response) => {
      dispatch(fetchPhotosLoading(false));
      return response;
    })
    .then((data) => {
      dispatch(fetchPhotosSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchPhotosLoading(false));
      dispatch(fetchPhotosError(error));
    });
};
