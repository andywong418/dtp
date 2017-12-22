import * as types from '../actions/types';

const generateState = () => {
  return {
    user: null,
    intention: "Open Minded",
    interests: {
      'interest1': {
        categorySelected: false,
        subCategorySelected: false,
        description: null
      },
      'interest2': {
        categorySelected: false,
        subCategorySelected: false,
        description: null
      },
      'interest3': {
        categorySelected: false,
        subCategorySelected: false,
        description: null
      }
    },
    bio: '',
    matchedUsers: null,
    sendMessage: false
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
      newState.interests = action.interests;
      newState.bio = action.bio;
      return newState;
    case types.GET_NEARBY_USERS:
      newState.matchedUsers = action.users
      return newState;
    case types.MEET_TOP_USER:
      newState.matchedUsers = newState.matchedUsers.filter(matchedUser => {
        return matchedUser.user._id !== action.user.user._id;
      });
      return newState;
    case types.AVOID_TOP_USER:
      newState.matchedUsers = newState.matchedUsers.filter(matchedUser => {
        return matchedUser.user._id !== action.user.user._id;
      });
      return newState;
    case types.NAVIGATE_TO_CONVO:
      newState.sendMessage = action.user;
      return newState;
    case types.LOGOUT:
      return generateState();
    default:
      return state;
  }
};

export default userReducer;
