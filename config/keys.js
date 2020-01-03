/**
 *
 * This file will
 * - In Production: Pull the keys values out of envs as used by Heroku envs.
 * - In Development: Pull the keys values defined in the .env root of the project for development.
 */

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGODB_URI,
  cookieKey: process.env.COOKIE_KEY,
  port: process.env.PORT,
  redisUrl: process.env.REDIS_URL,
  s3_access_id: process.env.S3_ACCESS_ID,
  s3_secret: process.env.S3_SECRET
};