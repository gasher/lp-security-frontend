export const djangoErrorResponseParser = error => {
  const { data } = error.response;

  return Object.keys(data).reduce((result, field) => {
    if (Array.isArray(data[field]) && data[field].length) {
      result[field] = data[field][0];
    }

    return result;
  }, {});
};

export default {
  djangoErrorResponseParser,
};
