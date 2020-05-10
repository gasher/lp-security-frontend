import React, { Component } from 'react';

import DashboardComponent from '../../../components/Dashboard';
import { withStore } from '../../../components/helpers';

class Dashboard extends Component {
  state = {
    currentUser: null,
    cameras: [],
    routines: [],
  };

  async componentDidMount() {
    const {
      store: { authStore, routineStore, cameraStore },
    } = this.props;
    const currentUser = await authStore.getCurrentUser();
    const cameras = await cameraStore.getAll();
    const routines = await routineStore.getAll();

    return this.setState({
      currentUser,
      cameras,
      routines,
    });
  }

  render() {
    const { currentUser, cameras, routines } = this.state;
    return (
      <DashboardComponent
        currentUser={currentUser}
        cameras={cameras}
        routines={routines}
      />
    );
  }
}

export default withStore(Dashboard);
