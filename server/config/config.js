const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_here',
  ACCESS_TOKEN_EXPIRATION: '15m',
  REFRESH_TOKEN_EXPIRATION: '7d',
  USE_MOCK_DB: process.env.USE_MOCK_DB === 'true' || true,
  SERVER_PORT: process.env.SERVER_PORT || 3000,
};
