const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://evglbnv.nomoredomains.rocks',
  'http://evglbnv.nomoredomains.rocks',
  'https://api.evglbnv.nomoredomains.rocks/',
  'http://api.evglbnv.nomoredomains.rocks/',
];

module.exports = (req, res, next) => {
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
};
