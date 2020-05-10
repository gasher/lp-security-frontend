import createApi from '../services/api';
import UiStore from './UiStore';
import AuthStore from './AuthStore';
import CameraStore from './CameraStore';
import RoutineStore from './RoutineStore';
import ConfigStore from './ConfigStore';
import TriggerStore from './TriggerStore';

class Store {
  constructor(config) {
    this.config = config;

    this.uiStore = new UiStore(this);
    this.authStore = new AuthStore(this);
    this.cameraStore = new CameraStore(this);
    this.routineStore = new RoutineStore(this);
    this.configStore = new ConfigStore(this);
    this.triggerStore = new TriggerStore(this);

    this.api = createApi({
      config: config.api,
    });
  }
}

export default Store;
