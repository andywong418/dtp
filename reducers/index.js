import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  routing,
});

export default rootReducer;
