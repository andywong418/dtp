import * as types from '../actions/types';

const generateState = () => {
  return {
    name: null,
    id: null,
    isLoggedIn: false,
    user: null,
    location: null
  }
}

const copyState = (state) => {
  return Object.assign({}, state)
}

const initialState = generateState();

const loginReducer = (state = initialState, action) => {
  let newState = copyState(state);
  switch (action.type) {
    case types.LOGIN:
      newState.name = action.name;
      newState.id = action.id;
      newState.isLoggedIn = true;
      return newState;
    case types.LOGOUT:
      return generateState();
    case types.POPULATE_USER:
      newState.user = action.user
      return newState;
    default:
      return state;
  }
};

export default loginReducer;
