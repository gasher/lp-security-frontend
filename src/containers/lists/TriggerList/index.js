import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import Trigger from '../../../components/entities/Trigger';
import EntityList from '../../../components/lists/EntityList';
import { withStore } from '../../../components/helpers';

class TriggerList extends Component {
  state = {
    triggers: [],
  };

  async componentDidMount() {
    const {
      store: { triggerStore, cameraStore, routineStore },
    } = this.props;
    const triggers = await triggerStore.getAll();
    const cameras = await cameraStore.getAll();
    const routines = await routineStore.getAll();

    const formatedTriggers = triggers.map(trigger => ({
      ...trigger,
      camera: cameras.find(camera => camera.id === trigger.camera).name,
      routine: routines.find(routine => routine.id === trigger.routine).name,
    }));

    return this.setState({
      triggers: formatedTriggers,
    });
  }

  mapScriptsToComponents() {
    return (
      <Row>
        {this.state.triggers.map(trigger => (
          <Trigger key={trigger.id} {...trigger} />
        ))}
      </Row>
    );
  }

  render() {
    return <EntityList entities={this.mapScriptsToComponents()} />;
  }
}

export default withStore(TriggerList);
