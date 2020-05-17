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

  executeRoutines = async params => {
    const sessionPromise = cameraService.executeRoutines(params);
    this.sessionStatus = fromPromise(sessionPromise);

    return sessionPromise;
  };

  handleGet = data => {
    return this.setCameras(data.results);
  };

  handleAdd = data => {
    return this.setCameras(this.cameras.push(data));
  };

  handleUpdate = data => {
    const cameras = this.cameras.filter(o => o.id !== data.id);
    cameras.push(data);

    return this.setCameras(cameras);
  };

  setCameras = cameras => {
    return (this.cameras = cameras);
  };

  reset = () => {
    this.cameras = [];
  };

  add = async params => {
    const sessionPromise = cameraService.add(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleAdd(res.data);
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
