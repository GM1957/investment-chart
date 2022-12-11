const axiosResponseWrapper = (fn) => {
  return fn
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    })
    .catch((error) => {
      throw new Error(`${JSON.stringify(error.response)}`);
    });
};

export { axiosResponseWrapper };
