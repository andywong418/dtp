import * as types from '../actions/types';

const generateState = () => {
  return {
    user: null,
    intention: "Open Minded",
  }
}

const copyState = (state) => {
  return JSON.parse(JSON.stringify(state))
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
    case types.UPDATE_USER_INFO:
      newState.intention = action.intention;
      return newState;
    case types.LOGOUT:
      return generateState();
    default:
      return state;
  }
};

export default userReducer;
