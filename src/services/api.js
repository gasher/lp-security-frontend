import axios from 'axios';

import config from '../config';

export default () => {
  const client = axios.create(config.api);

  const getData = {
    data(params) {
      return client.request({
        method: 'get',
        url: params,
      });
    },
  };

  const camera = {
    getAll(params) {
      console.log(params);
      return client.request({
        method: 'get',
        url: '/cameras/',
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
      });
    },

    add(params) {
      console.log(params);
      return client.request({
        method: 'post',
        url: '/cameras/',
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
      });
    },

    update(params) {
      console.log(params);
      return client.request({
        method: 'post',
        url: `/cameras/${params.id}/`,
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
        data: {
          ...params,
        },
      });
    },

    delete(params) {
      console.log(params);
      return client.request({
        method: 'post',
        url: `/cameras/${params.id}/`,
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
        data: {
          ...params,
        },
      });
    },
  };

  const user = {
    login(params) {
      return client.request({
        method: 'post',
        url: 'api-token-auth/',
        data: {
          username: params.username,
          password: params.password,
        },
      });
    },
    signup(params) {
      // TODO sign in
    },
  };

  return {
    getData,
    camera,
    user,
    client,
  };
};
