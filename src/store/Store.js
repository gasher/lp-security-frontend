import createApi from '../services/api';
import UiStore from './UiStore';
import AuthStore from './AuthStore';
import CameraStore from './CameraStore';

class Store {
  constructor(config) {
    this.config = config;

    this.uiStore = new UiStore(this);
    this.authStore = new AuthStore(this);
    this.cameraStore = new CameraStore(this);

    this.api = createApi({
      config: config.api,
    });
  }
}

export default Store;
