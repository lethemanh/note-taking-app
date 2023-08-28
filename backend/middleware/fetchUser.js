const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const fetchUser = (req, res, next) => {
  //get user from JWT and add id to req object;
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ error: 'Access denied' });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Access denied' });
  }
};
module.exports = fetchUser;
