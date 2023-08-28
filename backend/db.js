const mongoose = require('mongoose');
const config = require('./config');

const connectToMongo = () => {
  mongoose
    .connect(config.dbUri, {
      dbName: config.dbName,
      user: config.dbUsername,
      pass: config.dbPassword,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Mongodb connected....');
    })
    .catch(err => console.log(err.message));

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });

  mongoose.connection.on('error', err => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...',
      );
      process.exit(0);
    });
  });
};

module.exports = connectToMongo;
