import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

import './styles.css';
import Camera from '../Camera';
import { withStore } from '../helpers';

class CameraList extends Component {
  state = {
    cameras: [
      {
        title: 'Camera1',
        latitude: 46.754122,
        longitude: 23.561324,
        status: 'active',
        description: 'This is a random description',
      },
      {
        title: 'Camera2',
        latitude: -34.397,
        longitude: 150.644,
        status: 'inactive',
        description: 'This is a random description',
      },
      {
        title: 'Camera3',
        latitude: -34.397,
        longitude: 150.644,
        status: 'inactive',
        description: 'This is a random description',
      },
      {
        title: 'Camera4',
        latitude: -34.397,
        longitude: 150.644,
        status: 'active',
        description: 'This is a random description',
      },
    ],
  };

  componentDidMount() {
    const {
      store: { cameraStore },
    } = this.props;
    console.log(cameraStore);
    // cameraStore.getAll();
  }

  render() {
    return (
      <Container>
        <Row>
          {this.state.cameras.map((camera, index) => (
            <Camera key={index} {...camera} />
          ))}
        </Row>
      </Container>
    );
  }
}

export default withStore(CameraList);
