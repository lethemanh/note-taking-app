module.exports = {
  port: Number(process.env.PORT),
  dbUri: process.env.DATABASE_URI,
  dbName: process.env.DATABASE_NAME,
  dbUsername: process.env.DATABASE_USERNAME,
  dbPassword: process.env.DATABASE_PASSWORD,
  jwtSecretKey: process.env.JWT_SECRET,
  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
};
