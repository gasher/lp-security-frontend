import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import Routine from '../../../components/entities/Routine';
import EntityList from '../../../components/lists/EntityList';
import { withStore } from '../../../components/helpers';
import RoutineForm from '../../forms/RoutineForm';

class RoutineList extends Component {
  state = {
    routines: [],
  };

  async componentDidMount() {
    const {
      store: { routineStore },
    } = this.props;
    const routines = await routineStore.getAll();

    return this.setState({
      routines,
    });
  }

  mapScriptsToComponents() {
    return (
      <Row>
        {this.state.routines.map(routine => (
          <Routine key={routine.id} RoutineForm={RoutineForm} {...routine} />
        ))}
      </Row>
    );
  }

  render() {
    return (
      <EntityList
        entities={this.mapScriptsToComponents()}
        addHref="/routine-form"
      />
    );
  }
}

export default withStore(RoutineList);
