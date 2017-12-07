import * as types from './types';

export function callLogin(name, id) {
  return {
    type: types.LOGIN,
    name,
    id,
  };
}

export function callLogout() {
  return {
    type: types.LOGOUT,
  };
}
