import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import config from './config';
import createStore from './store';

import Screen from './components/routes/Screen';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import CameraList from './components/CameraList';
import CameraForm from './components/CameraForm';
import ProtectedRoute from './components/ProtectedRoute';

const store = createStore(config);

class App extends Component {
  render() {
    console.log(process.env);
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <ProtectedRoute path="/" component={Screen} exact />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <ProtectedRoute path="/cameras" component={CameraList} />
              <ProtectedRoute path="/camera-form" component={CameraForm} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default observer(App);
