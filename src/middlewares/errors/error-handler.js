export const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return res.status(statusCode).json({
    status: "fail",
    errors: [
      {
        message: err.message,
      },
    ],
  });
};
