import axios from 'axios';

import config from '../config';

class APIService {
  constructor() {
    this.client = axios.create(config.api);
  }

  get(params) {
    console.log(params);
    return client.request({
      method: 'get',
      url: params.url,
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
    });
  }

  add(params) {
    console.log(params);
    return client.request({
      method: 'post',
      url: params.url,
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
      data: {
        ...params.data,
      },
    });
  }

  update(params) {
    console.log(params);
    return client.request({
      method: 'put',
      url: params.url,
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
      data: {
        ...params.data,
      },
    });
  }

  delete(params) {
    console.log(params);
    return client.request({
      method: 'delete',
      url: params.url,
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
    });
  }
}

export default new APIService();
