import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import config from './config';
import createStore from './store';

import Screen from './components/routes/Screen';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import CameraList from './containers/lists/CameraList';
import CameraForm from './containers/forms/CameraForm';
import RoutineList from './containers/lists/RoutineList';
import RoutineForm from './containers/forms/RoutineForm';
import ProtectedRoute from './components/ProtectedRoute';
import ScriptList from './containers/lists/ScriptList';

const store = createStore(config);

class App extends Component {
  render() {
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
              <ProtectedRoute path="/routines" component={RoutineList} />
              <ProtectedRoute path="/routine-form" component={RoutineForm} />
              <ProtectedRoute path="/scripts" component={ScriptList} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default observer(App);
