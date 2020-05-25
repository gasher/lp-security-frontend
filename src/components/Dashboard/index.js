import React from 'react';
import { Jumbotron, Button, Row, Col } from 'react-bootstrap';
import moment from 'moment';

import Chart from '../Chart';
import BarChart from '../BarChart';

import './styles.css';

const Dashboard = ({ currentUser, cameras, routines, triggers }) => {
  return (
    <Jumbotron>
      <h1>{currentUser && `Hello ${currentUser.first_name}`}</h1>
      <p>
        {cameras &&
          routines &&
          `You have ${routines.length} routines and ${
            cameras.length
          } cameras from which ${
            cameras.filter(camera => camera.status === 'AC').length
          } active.`}
      </p>
      <p>
        <Button variant="primary" href="/cameras">
          Manage cameras
        </Button>{' '}
        <Button variant="secondary" href="/routines">
          Manage routines
        </Button>
      </p>
      <Row>
        <Col>
          <Chart
            title="Cameras Status"
            active={cameras.filter(camera => camera.status === 'AC').length}
            inactive={cameras.filter(camera => camera.status === 'IN').length}
          />
        </Col>
        <Col>
          <BarChart
            title="Last 10 days triggers"
            triggers={triggers.filter(trigger =>
              moment(trigger.triggered_at).isAfter(
                moment()
                  .startOf('day')
                  .subtract(10, 'days')
              )
            )}
          />
        </Col>
      </Row>
    </Jumbotron>
  );
};

export default Dashboard;
