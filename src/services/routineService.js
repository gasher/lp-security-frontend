import client from './client';

class RoutineService {
  upload(params) {
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
  }

  getAll(params) {
    return client.request({
      method: 'get',
      url: '/routines/',
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
    });
  }

  add(params) {
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
  }

  update(params) {
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
  }

  delete(id) {
    return client.request({
      method: 'delete',
      url: `/routines/${id}/`,
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
    });
  }
}

export default new RoutineService();
