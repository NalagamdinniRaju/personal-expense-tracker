const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        details: err.details
      });
    }
  
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid authentication credentials'
      });
    }
  
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong'
    });
  };
  
  module.exports = errorHandler;