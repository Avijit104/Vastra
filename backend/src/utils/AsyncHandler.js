const AsyncHandler = (reqFunction) => {
  return (req, res, next) => {
    Promise.resolve(reqFunction(res, req, next)).catch((err) => next(err));
  };
};

export { AsyncHandler };
