import React, { useState } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

import './styles.css';
import ConfigFile from '../ConfigFile';
import Map from '../Map';
import ModalComponent from '../Modal';
import VideoFeed from '../VideoFeed';
import { generateConfigFile } from '../../../config/templates';

const Camera = ({
  id,
  name,
  description,
  latitude,
  longitude,
  status,
  ip_address,
  CameraForm,
  TriggerRoutinesForm,
}) => {
  const [showMap, setShowMap] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showFeed, setShowFeed] = useState(false);
  const [showConfigJSON, setShowConfigJSON] = useState(false);
  const [showTriggerRoutines, setShowTriggerRoutines] = useState(false);

  const handleCloseMap = () => setShowMap(false);
  const handleShowMap = () => setShowMap(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseFeed = () => setShowFeed(false);
  const handleShowFeed = () => setShowFeed(true);
  const handleShowConfigJSON = () => setShowConfigJSON(true);
  const handleCloseConfigJSON = () => setShowConfigJSON(false);
  const handleShowTriggerRoutines = () => setShowTriggerRoutines(true);
  const handleCloseTriggerRoutines = () => setShowTriggerRoutines(false);

  const statusLabel = status === 'AC' ? 'active' : 'inactive';

  return (
    <div className="camera">
      <Jumbotron>
        <h1>{name}</h1>
        <h3 className={`status-${statusLabel}`}>{statusLabel}</h3>
        <p>{description}</p>
        <p>
          <Button variant="secondary" onClick={handleShowMap}>
            Show map
          </Button>{' '}
          <Button variant="primary" onClick={handleShowEdit}>
            Manage camera
          </Button>{' '}
          <Button variant="info" onClick={handleShowFeed}>
            Show video feed
          </Button>{' '}
          <Button variant="secondary" onClick={handleShowConfigJSON}>
            Get config.json
          </Button>{' '}
          <Button variant="danger" onClick={handleShowTriggerRoutines}>
            Execute associated routines
          </Button>{' '}
        </p>
      </Jumbotron>
      <ModalComponent
        show={showMap}
        handleClose={handleCloseMap}
        title={name}
        BodyComponent={<Map {...{ longitude, latitude }} />}
      />
      <ModalComponent
        show={showEdit}
        handleClose={handleCloseEdit}
        title={name}
        BodyComponent={
          <CameraForm
            {...{
              id,
              name,
              description,
              latitude,
              longitude,
              status,
              ip_address,
              closeModal: () => handleCloseEdit(),
            }}
          />
        }
      />
      <ModalComponent
        show={showFeed}
        handleClose={handleCloseFeed}
        title={name}
        BodyComponent={<VideoFeed {...{ ip_address }} />}
      />
      <ModalComponent
        show={showConfigJSON}
        handleClose={handleCloseConfigJSON}
        title="Copy this content into your agent's config.json"
        BodyComponent={<ConfigFile content={generateConfigFile(id)} />}
      />
      <ModalComponent
        show={showTriggerRoutines}
        handleClose={handleCloseTriggerRoutines}
        title={name}
        BodyComponent={
          <TriggerRoutinesForm
            cameraId={id}
            closeModal={() => handleCloseTriggerRoutines()}
          />
        }
      />
    </div>
  );
};

export default Camera;
