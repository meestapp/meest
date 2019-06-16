module.exports = {
  database: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    name: process.env.MONGO_DB_NAME,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authDb: process.env.MONGO_AUTH_DB_NAME,
  },
  secrets: {
    jwt: process.env.SECRETS_JWT,
  },
};
