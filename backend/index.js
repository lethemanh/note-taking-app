const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const config = require('./config');

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Note-Taking-App server');
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(config.port, async () => {
  try {
    await connectToMongo();
  } catch (err) {
    console.error('Error connecting to MongoDB: ', err.message);
  }
  console.log(`Note-Taking-App server is listening to port ${config.port}`);
});
