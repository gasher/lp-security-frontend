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
    console.log(this.store.api);
    const sessionPromise = this.store.api.camera.getAll(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleGet(res.data);
  };

  handleGet = data => {
    return this.setCameras(JSON.parse(data));
  };

  setCameras = cameras => {
    return this.cameras.set(cameras);
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
