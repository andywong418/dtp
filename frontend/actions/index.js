import * as types from './types';
import axios from 'axios';
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

export function populateUser(user) {
  return {
    type: types.POPULATEUSER,
    user,
  };
}

export function fetchUserFromDB(user) {
  return {
    type: types.FETCHUSERFROMDB,
    user
  };

}
