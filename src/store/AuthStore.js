import { decorate, observable, computed, action, extendObservable } from 'mobx';
import { fromPromise } from 'mobx-utils';
import Cookie from 'mobx-cookie';

import userService from '../services/userService';

class AuthStore {
  constructor(store) {
    this.store = store;
    this.currentUser = null;
    extendObservable(this, {
      token: new Cookie('token'),
    });
  }

  // Observables
  sessionStatus;

  // Computed
  get isLoggedIn() {
    return Boolean(this.token.get());
  }

  // Actions
  signUp = async params => {
    const sessionPromise = userService.signup(params);
    this.sessionStatus = fromPromise(sessionPromise);
    return sessionPromise;
  };

  login = async params => {
    const sessionPromise = userService.login(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleAuth(res.data);
  };

  getCurrentUser = async params => {
    const sessionPromise = userService.getCurrentUser(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleGetCurrentUser(res.data);
  };

  handleGetCurrentUser = data => {
    return this.setCurrentUser(data);
  };

  setCurrentUser = user => {
    return (this.currentUser = user);
  };

  handleAuth = data => {
    this.setToken(data.token);
  };

  setToken = token => {
    localStorage.setItem('token', token);

    return this.token.set(token, { expires: 7 });
  };

  reset = () => {
    localStorage.removeItem('token');
    this.sessionStatus = null;

    return this.token.remove();
  };

  forgotPassword = async params => {
    const sessionPromise = userService.forgotPassword(params);
    this.sessionStatus = fromPromise(sessionPromise);
    return sessionPromise;
  };

  changePassword = async params => {
    const sessionPromise = userService.changePassword(params);
    this.sessionStatus = fromPromise(sessionPromise);
    return sessionPromise;
  };
}

decorate(AuthStore, {
  sessionStatus: observable,
  currentUser: observable,
  isLoggedIn: computed,
  signUp: action,
  login: action,
  handleAuth: action,
  setToken: action,
  reset: action,
});

export default AuthStore;
