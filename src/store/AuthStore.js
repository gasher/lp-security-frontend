import { decorate, observable, computed, action, extendObservable } from 'mobx';
import { fromPromise } from 'mobx-utils';
import Cookie from 'mobx-cookie';

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
    const sessionPromise = this.store.api.user.signup(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    // Do stuff
  };

  login = async params => {
    const sessionPromise = this.store.api.user.login(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    return this.handleAuth(res.data);
  };

  getCurrentUser = async params => {
    const sessionPromise = this.store.api.user.getCurrentUser(params);
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
