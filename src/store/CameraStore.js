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
    const sessionPromise = this.store.api.cameras.getAll(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleAuth(res.data);
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
  signUp: action,
  login: action,
  handleAuth: action,
  setToken: action,
  reset: action,
});

export default CameraStore;
