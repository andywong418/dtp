import * as types from '../actions/types';

const generateState = () => {
  return {
    name: undefined,
    id: undefined,
    isLoggedIn: false,
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
      console.log('logout reached in reducer');
      console.log(generateState());
      return generateState();
    default:
      return state;
  }
};

export default loginReducer;
