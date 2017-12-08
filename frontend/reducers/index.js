import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  routing,
});

export default rootReducer;
