
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Get the token from the header
    const token = req.header('Authorization').replace('Bearer ', '');
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add the user to the request object
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

module.exports = auth;
