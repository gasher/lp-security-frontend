import React, { Component } from 'react';

import DashboardComponent from '../../../components/Dashboard';
import { withStore } from '../../../components/helpers';

class Dashboard extends Component {
  state = {
    currentUser: null,
    cameras: [],
    routines: [],
    triggers: [],
  };

  async componentDidMount() {
    const {
      store: { authStore, routineStore, cameraStore, triggerStore },
    } = this.props;
    await authStore.getCurrentUser();
    await cameraStore.getAll();
    await routineStore.getAll();
    await triggerStore.getAll();

    return this.setState({
      currentUser: authStore.currentUser,
      cameras: cameraStore.cameras,
      routines: routineStore.routines,
      triggers: triggerStore.triggers,
    });
  }

  render() {
    const { currentUser, cameras, routines, triggers } = this.state;

    return (
      <DashboardComponent
        currentUser={currentUser}
        cameras={cameras}
        routines={routines}
        triggers={triggers}
      />
    );
  }
}

export default withStore(Dashboard);
