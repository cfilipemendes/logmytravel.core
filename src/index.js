require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); // logger
const cors = require('cors');
// Removes X-powered-by header
const helmet = require('helmet');
const mongoose = require('mongoose');
const errorHandlers = require('./exceptionHandlers.js');
const logs = require('../api/posts.js');

// DATABASE INIT
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// APP INIT
const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());// To interpret json

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.use('/api/visits', logs);
app.use(errorHandlers.notFound);

app.use(errorHandlers.errorHandler);

const port = process.env.port || 1337;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port http://localhost:${port} !`));
