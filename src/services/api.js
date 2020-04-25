import axios from 'axios';

import apiConfig from '../config';

export default () => {
  const client = axios.create(apiConfig.api);

  const getData = {
    data(params) {
      return client.request({
        method: 'get',
        url: params,
      });
    },
  };

  const actions = {
    getAll(params) {
      console.log(params);

      return client.request({
        method: 'get',
        url: params.url,
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
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
        data: {
          ...params,
        },
      });
    },

    update(params) {
      console.log(params);
      return client.request({
        method: 'put',
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

  const routine = {
    upload(params) {
      console.log(params);
      const data = new FormData();
      data.append('file', params.file);

      return client.request({
        method: 'post',
        url: '/upload/',
        headers: {
          Authorization: `Token ${localStorage.token}`,
          'Content-Type': 'multipart/form-data',
        },
        data,
      });
    },

    getAll(params) {
      console.log(params);
      return client.request({
        method: 'get',
        url: '/routines/',
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
      });
    },

    add(params) {
      console.log(params);
      return client.request({
        method: 'post',
        url: '/routines/',
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
        data: {
          ...params,
        },
      });
    },

    update(params) {
      console.log(params);
      return client.request({
        method: 'put',
        url: `/routines/${params.id}/`,
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
        url: `/routines/${params.id}/`,
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
        data: {
          ...params,
        },
      });
    },
  };

  const config = {
    getAll(params) {
      console.log(params);
      return client.request({
        method: 'get',
        url: '/configs/',
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
      });
    },

    add(params) {
      console.log(params);
      return client.request({
        method: 'post',
        url: '/configs/',
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
        data: {
          ...params,
        },
      });
    },

    update(params) {
      console.log(params);
      return client.request({
        method: 'put',
        url: `/configs/${params.id}/`,
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
        url: `/configs/${params.id}/`,
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
        url: '/api-token-auth/',
        data: {
          username: params.username,
          password: params.password,
        },
      });
    },
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
    },
  };

  return {
    getData,
    camera,
    user,
    client,
    routine,
    actions,
    config,
  };
};
