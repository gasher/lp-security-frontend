import { decorate, observable, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

import configService from '../services/configService';

class ConfigStore {
  constructor(store) {
    this.store = store;
    this.configs = [];
  }

  // Observables
  sessionStatus;

  getAll = async params => {
    const sessionPromise = configService.getAll(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleGet(res.data);
  };

  update = async params => {
    const sessionPromise = configService.update(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleUpdate(res.data);
  };

  add = async params => {
    const sessionPromise = configService.add(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleAdd(res.data);
  };

  delete = async id => {
    const sessionPromise = configService.delete(id);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleDelete(id);
  };

  upload = async params => {
    const sessionPromise = configService.upload(params);
    this.sessionStatus = fromPromise(sessionPromise);

    return sessionPromise;
  };

  handleGet = data => {
    this.configs = data.results;

    return this.configs;
  };

  handleAdd = data => {
    return this.setConfigs([...this.configs, data]);
  };

  handleDelete = id => {
    return this.setConfigs(this.configs.filter(config => config.id !== id));
  };

  handleUpdate = data => {
    const configs = this.configs.filter(o => o.id !== data.id);

    return this.setConfigs([...configs, data]);
  };

  setConfigs = configs => {
    this.configs = configs;

    return this.configs;
  };

  reset = () => {
    this.configs = [];
  };
}

decorate(ConfigStore, {
  configs: observable,
  sessionStatus: observable,
  getAll: action,
  add: action,
  update: action,
  delete: action,
  update: action,
  handleGet: action,
  handleDelete: action,
  handleUpdate: action,
  handleUpdate: action,
  setConfigs: action,
  reset: action,
});

export default ConfigStore;
