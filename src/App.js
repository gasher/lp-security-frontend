import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import config from './config';
import createStore from './store';

import Dashboard from './containers/pages/Dashboard';
import Login from './containers/forms/LoginForm';
import Register from './containers/forms/RegisterForm';
import Navbar from './components/Navbar';
import CameraList from './containers/lists/CameraList';
import CameraForm from './containers/forms/CameraForm';
import RoutineList from './containers/lists/RoutineList';
import RoutineForm from './containers/forms/RoutineForm';
import ProtectedRoute from './components/ProtectedRoute';
import ConfigList from './containers/lists/ConfigList';
import ConfigForm from './containers/forms/ConfigForm';
import TriggerList from './containers/lists/TriggerList';

const store = createStore(config);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <ProtectedRoute path="/" component={Dashboard} exact />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <ProtectedRoute path="/cameras" component={CameraList} />
              <ProtectedRoute path="/camera-form" component={CameraForm} />
              <ProtectedRoute path="/routines" component={RoutineList} />
              <ProtectedRoute path="/routine-form" component={RoutineForm} />
              <ProtectedRoute path="/configs" component={ConfigList} />
              <ProtectedRoute path="/config-form" component={ConfigForm} />
              <ProtectedRoute path="/triggers" component={TriggerList} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default observer(App);
