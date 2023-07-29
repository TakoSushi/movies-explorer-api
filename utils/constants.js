const limiterConfig = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};

const serverPort = 8080;
const dbAddress = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  limiterConfig,
  serverPort,
  dbAddress,
};
