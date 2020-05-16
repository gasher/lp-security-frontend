import client from './client';

class ConfigService {
  getAll(params) {
    console.log(params);
    return client.request({
      method: 'get',
      url: '/configs/',
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
    });
  }

  add(params) {
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
  }

  update(params) {
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
  }

  delete(params) {
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
  }
}

export default new ConfigService();
