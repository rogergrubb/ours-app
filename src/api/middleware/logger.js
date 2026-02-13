// Request logger — lightweight, structured
// Owner: Chief Programmer

export const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = `${req.method} ${req.path} ${res.statusCode} ${duration}ms`;
    
    if (res.statusCode >= 500) console.error(`[REQ] ${log}`);
    else if (res.statusCode >= 400) console.warn(`[REQ] ${log}`);
    else if (req.path !== '/api/health') console.log(`[REQ] ${log}`);
  });
  
  next();
};
