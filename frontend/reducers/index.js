import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import userReducer from './userReducer';
import locationReducer from './locationReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  location: locationReducer,
  routing,
});

export default rootReducer;
