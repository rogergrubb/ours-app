// Auth middleware — JWT verification
// Owner: Chief Programmer

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // TODO: Verify JWT token, attach user to req
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;
    req.user = { id: 1, uuid: 'mock-uuid', handle: '@you' }; // MOCK — remove when real auth implemented
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    try {
      req.user = { id: 1, uuid: 'mock-uuid', handle: '@you' }; // MOCK
    } catch (err) {
      // Invalid token on optional route = continue as anonymous
    }
  }
  next();
};
