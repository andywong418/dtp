import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './frontend/reducers/index';
import Root from './frontend/screens/Root'

const store = createStore(rootReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}
