import { decorate, observable, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

import cameraService from '../services/cameraService';

class CameraStore {
  constructor(store) {
    this.store = store;
    this.cameras = [];
  }

  // Observables
  sessionStatus;

  getAll = async params => {
    const sessionPromise = cameraService.getAll(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleGet(res.data);
  };

  update = async params => {
    const sessionPromise = cameraService.update(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleUpdate(res.data);
  };

  add = async params => {
    const sessionPromise = cameraService.add(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleAdd(res.data);
  };

  delete = async id => {
    const sessionPromise = cameraService.delete(id);
    this.sessionStatus = fromPromise(sessionPromise);
    await sessionPromise;

    return this.handleDelete(id);
  };

  executeRoutines = async params => {
    const sessionPromise = cameraService.executeRoutines(params);
    this.sessionStatus = fromPromise(sessionPromise);

    return sessionPromise;
  };

  handleGet = data => {
    return this.setCameras(data.results);
  };

  handleAdd = data => {
    return this.setCameras([...this.cameras, data]);
  };

  handleDelete = id => {
    return this.setCameras(this.cameras.filter(camera => camera.id !== id));
  };

  handleUpdate = data => {
    const cameras = this.cameras.filter(o => o.id !== data.id);

    return this.setCameras([...cameras, data]);
  };

  setCameras = cameras => {
    this.cameras = cameras;

    return this.cameras;
  };

  reset = () => {
    this.cameras = [];
  };
}

decorate(CameraStore, {
  cameras: observable,
  sessionStatus: observable,
  getAll: action,
  handleGet: action,
  setCameras: action,
  reset: action,
});

export default CameraStore;
