module.exports = (err, req, res, next) => {
  console.error(err.message);

  // Handle different types of errors and respond accordingly
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
  }

  res.status(statusCode).json({ message });
};
