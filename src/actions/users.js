// @flow
import api from '../api';

export const FETCH_USERS__ERROR = 'FETCH_USERS__ERROR';
export const FETCH_USERS__LOADING = 'FETCH_USERS__LOADING';
export const FETCH_USERS__SUCCESS = 'FETCH_USERS__SUCCESS';

export function fetchUsersError(error: Object) {
  return {
    type: FETCH_USERS__ERROR,
    error,
  };
}

export function fetchUsersLoading(bool: boolean) {
  return {
    type: FETCH_USERS__LOADING,
    loading: bool,
  };
}

export function fetchUsersSuccess(data: Object) {
  return {
    type: FETCH_USERS__SUCCESS,
    payload: data,
  };
}

export default function fetchUsers(page: number, limit: number) {
  return (dispatch: Function) => {
    dispatch(fetchUsersLoading(true));

    const url = `users?_page=${page + 1}&_limit=${limit}`;

    api.get(url)
      .then((response) => {
        dispatch(fetchUsersLoading(false));
        dispatch(fetchUsersError({}));
        return response;
      })
      .then((data) => {
        dispatch(fetchUsersSuccess(data));
      })
      .catch((error) => {
        if (error.message) {
          dispatch(fetchUsersLoading(false));
          dispatch(fetchUsersError(error));
        }
      });
  };
}
