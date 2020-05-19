import client from './client';

class UserService {
  getCurrentUser(params) {
    return client.request({
      method: 'get',
      url: '/current-user/',
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
    });
  }

  login(params) {
    return client.request({
      method: 'post',
      url: '/api-token-auth/',
      data: {
        username: params.username,
        password: params.password,
      },
    });
  }

  signup(params) {
    return client.request({
      method: 'post',
      url: '/users/',
      data: {
        email: params.email,
        username: params.username,
        password: params.password,
        first_name: params.firstName,
        last_name: params.lastName,
      },
    });
  }

  forgotPassword(params) {
    return client.request({
      method: 'post',
      url: '/forgot-password/',
      data: {
        email: params.email,
      },
    });
  }

  changePassword(params) {
    return client.request({
      method: 'post',
      url: '/change-password/',
      headers: {
        Authorization: `Token ${params.token}`,
      },
      data: {
        password: params.password,
      },
    });
  }
}

export default new UserService();
