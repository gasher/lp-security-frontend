import AuthStore from './AuthStore';
import CameraStore from './CameraStore';
import RoutineStore from './RoutineStore';
import ConfigStore from './ConfigStore';
import TriggerStore from './TriggerStore';

class Store {
  constructor(config) {
    this.config = config;

    this.authStore = new AuthStore(this);
    this.cameraStore = new CameraStore(this);
    this.routineStore = new RoutineStore(this);
    this.configStore = new ConfigStore(this);
    this.triggerStore = new TriggerStore(this);
  }
}

export default Store;
