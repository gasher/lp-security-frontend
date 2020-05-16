import { decorate, observable, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

class RoutineStore {
  constructor(store) {
    this.store = store;
    this.routines = [];
  }

  // Observables
  sessionStatus;

  getAll = async params => {
    const sessionPromise = this.store.api.routine.getAll(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleGet(res.data);
  };

  update = async params => {
    const sessionPromise = this.store.api.routine.update(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleUpdate(res.data);
  };

  add = async params => {
    const sessionPromise = this.store.api.routine.add(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleAdd(res.data);
  };

  upload = async params => {
    const sessionPromise = this.store.api.routine.upload(params);
    this.sessionStatus = fromPromise(sessionPromise);

    return sessionPromise;
  };

  handleGet = data => {
    return this.setRoutines(data.results);
  };

  handleAdd = data => {
    return this.setRoutines(this.routines.push(data));
  };

  handleUpdate = data => {
    const routines = this.routines.filter(o => o.id !== data.id);
    routines.push(data);

    return this.setRoutines(routines);
  };

  setRoutines = routines => {
    return (this.routines = routines);
  };

  reset = () => {
    this.routines = [];
  };
}

decorate(RoutineStore, {
  routines: observable,
  sessionStatus: observable,
  getAll: action,
  handleGet: action,
  setRoutines: action,
  reset: action,
});

export default RoutineStore;
