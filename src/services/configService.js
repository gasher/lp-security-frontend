import client from './client';

class ConfigService {
  getAll(params) {
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

  delete(id) {
    return client.request({
      method: 'delete',
      url: `/configs/${id}/`,
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
    });
  }
}

export default new ConfigService();
