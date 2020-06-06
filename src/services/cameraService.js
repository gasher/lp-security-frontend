import client from './client';

class CameraService {
  getAll(params) {
    return client.request({
      method: 'get',
      url: '/cameras/',
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
    });
  }

  add(params) {
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
  }

  update(params) {
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
  }

  delete(id) {
    return client.request({
      method: 'delete',
      url: `/cameras/${id}/`,
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
    });
  }

  executeRoutines(params) {
    return client.request({
      method: 'post',
      url: '/license-plate/',
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
      data: {
        ...params,
      },
    });
  }
}

export default new CameraService();
