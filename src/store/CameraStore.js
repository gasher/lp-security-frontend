import { decorate, observable, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

class CameraStore {
  constructor(store) {
    this.store = store;
    this.cameras = [];
  }

  // Observables
  sessionStatus;

  getAll = async params => {
    const sessionPromise = this.store.api.camera.getAll(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleGet(res.data);
  };

  handleGet = data => {
    return this.setCameras(data.results);
  };

  handleAdd = data => {
    return this.setCameras(this.cameras.push(JSON.parse(data)));
  };

  setCameras = cameras => {
    return (this.cameras = cameras);
  };

  reset = () => {
    this.cameras = [];
  };

  add = async params => {
    const sessionPromise = this.store.api.camera.add(params);
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
