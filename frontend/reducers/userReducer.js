import * as types from '../actions/types';

const generateState = () => {
  return {
    user: null,
  }
}

const copyState = (state) => {
  return Object.assign({}, state)
}

const initialState = generateState();

const userReducer = (state = initialState, action) => {
  let newState = copyState(state);
  switch (action.type) {
    case types.POPULATE_USER:
      newState.user = action.user
      return newState;
    case types.FETCH_USER_FROM_DB:
      newState.user = action.user;
      return newState;
    case types.LOGOUT:
      return generateState();
    default:
      return state;
  }
};

export default userReducer;
