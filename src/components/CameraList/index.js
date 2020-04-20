import React, { Component } from 'react';
import { Container, Row, Button } from 'react-bootstrap';

import './styles.css';
import Camera from '../Camera';
import { withStore } from '../helpers';

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

  render() {
    return (
      <Container>
        <Button href="/camera-form">Add camera</Button>
        <Row>
          {this.state.cameras.map(camera => (
            <Camera key={camera.id} {...camera} />
          ))}
        </Row>
      </Container>
    );
  }
}

export default withStore(CameraList);
