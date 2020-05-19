import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import Chart from '../Chart';

import './styles.css';

const Dashboard = ({ currentUser, cameras, routines }) => {
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
      <div>
        <Chart
          title="Cameras Status"
          active={cameras.filter(camera => camera.status === 'AC').length}
          inactive={cameras.filter(camera => camera.status === 'IN').length}
        />
      </div>
    </Jumbotron>
  );
};

export default Dashboard;
