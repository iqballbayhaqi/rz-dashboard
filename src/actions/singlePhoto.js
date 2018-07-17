// @flow
import api from '../api';

export const FETCH_SINGLE_PHOTO__ERROR = 'FETCH_SINGLE_PHOTO__ERROR';
export const FETCH_SINGLE_PHOTO__LOADING = 'FETCH_SINGLE_PHOTO__LOADING';
export const FETCH_SINGLE_PHOTO__SUCCESS = 'FETCH_SINGLE_PHOTO__SUCCESS';

export const fetchSinglePhotoError = (error: Object) => ({
  type: FETCH_SINGLE_PHOTO__ERROR,
  error,
});

export const fetchSinglePhotoLoading = (bool: boolean) => ({
  type: FETCH_SINGLE_PHOTO__LOADING,
  loading: bool,
});

export const fetchSinglePhotoSuccess = (data: Object) => ({
  type: FETCH_SINGLE_PHOTO__SUCCESS,
  payload: data,
});

export const fetchSinglePhoto = (id: number) => (dispatch: Function) => {
  dispatch(fetchSinglePhotoLoading(true));

  const url = `photos/${id}`;

  api.get(url)
    .then((response) => {
      dispatch(fetchSinglePhotoLoading(false));
      return response;
    })
    .then((data) => {
      dispatch(fetchSinglePhotoSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchSinglePhotoLoading(false));
      dispatch(fetchSinglePhotoError(error));
    });
};
