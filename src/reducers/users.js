// @flow
import {
  FETCH_USERS__ERROR,
  FETCH_USERS__LOADING,
  FETCH_USERS__SUCCESS,
} from '../actions/users';

const defaultState = {
  users: [],
  count: 0,
  loading: false,
  error: {},
};

export default function usersReducer(state: Object = defaultState, action: Object = {}) {
  switch (action.type) {
    case FETCH_USERS__SUCCESS: {
      const { 'x-total-count': count } = action.payload.headers;
      return {
        ...state,
        users: action.payload.data,
        count: parseInt(count, 10),
      };
    }
    case FETCH_USERS__LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case FETCH_USERS__ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
