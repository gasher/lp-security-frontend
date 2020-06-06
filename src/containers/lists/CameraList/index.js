import React, { Component } from 'react';

import Camera from '../../../components/entities/Camera';
import EntityList from '../../../components/lists/EntityList';
import { withStore } from '../../../components/helpers';
import CameraForm from '../../forms/CameraForm';
import TriggerRoutinesForm from '../../forms/TriggerRoutinesForm';

class CameraList extends Component {
  state = {
    cameras: [],
  };

  async componentDidMount() {
    const {
      store: { cameraStore },
    } = this.props;
    const cameras = await cameraStore.getAll();

    return this.setState({
      cameras,
    });
  }

  mapScriptsToComponents() {
    const {
      store: {
        cameraStore: { cameras },
      },
    } = this.props;

    return cameras.map(camera => (
      <Camera
        key={camera.id}
        CameraForm={CameraForm}
        TriggerRoutinesForm={TriggerRoutinesForm}
        {...camera}
      />
    ));
  }

  render() {
    return (
      <EntityList
        entities={this.mapScriptsToComponents()}
        addHref="/camera-form"
      />
    );
  }
}

export default withStore(CameraList);
