import { decorate, observable, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

class ConfigStore {
  constructor(store) {
    this.store = store;
    this.configs = [];
  }

  // Observables
  sessionStatus;

  getAll = async params => {
    const sessionPromise = this.store.api.config.getAll(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleGet(res.data);
  };

  update = async params => {
    const sessionPromise = this.store.api.config.update(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleUpdate(res.data);
  };

  add = async params => {
    const sessionPromise = this.store.api.config.add(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleAdd(res.data);
  };

  upload = async params => {
    const sessionPromise = this.store.api.config.upload(params);
    this.sessionStatus = fromPromise(sessionPromise);

    return sessionPromise;
  };

  handleGet = data => {
    return this.setConfigs(data.results);
  };

  handleAdd = data => {
    return this.setConfigs(this.configs.push(data));
  };

  handleUpdate = data => {
    const configs = this.configs.filter(o => o.id !== data.id);
    configs.push(data);

    return this.setConfigs(configs);
  };

  setConfigs = configs => {
    return (this.configs = configs);
  };

  reset = () => {
    this.configs = [];
  };
}

decorate(ConfigStore, {
  configs: observable,
  sessionStatus: observable,
  getAll: action,
  handleGet: action,
  setConfigs: action,
  reset: action,
});

export default ConfigStore;
