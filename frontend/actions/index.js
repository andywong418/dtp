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
    type: types.POPULATE_USER,
    user,
  };
}

export function fetchUserFromDB(user) {
  return {
    type: types.FETCH_USER_FROM_DB,
    user
  };
}

export function updateUserInfo(intention) {
  return {
    type: types.UPDATE_USER_INFO,
    intention,
  };
}

export function updateLocation(location) {
  let { lat, lng, city } = location;
  return {
    type: types.UPDATE_LOCATION,
    lat,
    lng,
    city
  };
}

export function getNearbyUsers(users) {
  return {
    type: types.GET_NEARBY_USERS,
    users
  }
}

export function meetTopUser(user) {
  return {
    type: types.MEET_TOP_USER,
    user
  }
}

export function avoidTopUser(user) {
  return {
    type: types.AVOID_TOP_USER,
    user
  }
}
