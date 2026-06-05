const AsyncHandler = (reqFunction) => {
  return (req, res, next) => {
    Promise.resolve(reqFunction(req, res, next)).catch((err) => next(err));
  };
};

export { AsyncHandler };
