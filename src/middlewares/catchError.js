const catchError = (foo) => (req, res, next) => {
  return foo(req, res, next).catch(next);
};

module.exports = catchError;
