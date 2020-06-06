import { decorate, observable, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

import routineService from '../services/routineService';

class RoutineStore {
  constructor(store) {
    this.store = store;
    this.routines = [];
  }

  // Observables
  sessionStatus;

  getAll = async params => {
    const sessionPromise = routineService.getAll(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleGet(res.data);
  };

  update = async params => {
    const sessionPromise = routineService.update(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleUpdate(res.data);
  };

  add = async params => {
    const sessionPromise = routineService.add(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleAdd(res.data);
  };

  delete = async id => {
    const sessionPromise = routineService.delete(id);
    this.sessionStatus = fromPromise(sessionPromise);
    await sessionPromise;

    return this.handleDelete(id);
  };

  upload = async params => {
    const sessionPromise = routineService.upload(params);
    this.sessionStatus = fromPromise(sessionPromise);

    return sessionPromise;
  };

  handleGet = data => {
    return this.setRoutines(data.results);
  };

  handleAdd = data => {
    return this.setRoutines([...this.routines, data]);
  };

  handleDelete = id => {
    return this.setRoutines(this.routines.filter(routine => routine.id !== id));
  };

  handleUpdate = data => {
    const routines = this.routines.filter(o => o.id !== data.id);

    return this.setRoutines([...routines, data]);
  };

  setRoutines = routines => {
    this.routines = routines;

    return this.routines;
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
