const errorHandlingMiddleware = (err, req, res, next) => {
  const status = err.status || 500
  const message = status === 500 ? 'Something went wrong. Try again later.' : err.message
  console.log(`Error: ${err.status} ${err.message}`, { stack: err.stack })
  res.status(status).json({ message })
}

module.exports = errorHandlingMiddleware
