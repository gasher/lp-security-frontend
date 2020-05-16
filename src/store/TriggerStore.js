import { decorate, observable, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

import triggerService from '../services/triggerService';

class TriggerStore {
  constructor(store) {
    this.store = store;
    this.triggers = [];
  }

  // Observables
  sessionStatus;

  getAll = async params => {
    const sessionPromise = triggerService.getAll(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleGet(res.data);
  };

  handleGet = data => {
    return this.setTriggers(data.results);
  };

  setTriggers = triggers => {
    return (this.triggers = triggers);
  };

  reset = () => {
    this.triggers = [];
  };
}

decorate(TriggerStore, {
  triggers: observable,
  sessionStatus: observable,
  getAll: action,
  handleGet: action,
  setTriggers: action,
  reset: action,
});

export default TriggerStore;
