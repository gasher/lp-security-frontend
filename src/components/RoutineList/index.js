import React, { Component } from 'react';
import { Container, Row, Button } from 'react-bootstrap';

import './styles.css';
import Routine from '../Routine';
import { withStore } from '../helpers';

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

  render() {
    return (
      <Container>
        <Button href="/routine-form">Add Routine</Button>
        <Row>
          {this.state.routines.map(routine => (
            <Routine key={routine.id} {...routine} />
          ))}
        </Row>
      </Container>
    );
  }
}

export default withStore(RoutineList);
