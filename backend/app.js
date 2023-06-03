require('dotenv').config();
/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const { handleErrors } = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://evglbnv.nomoredomains.rocks',
  'http://evglbnv.nomoredomains.rocks',
  'https://api.evglbnv.nomoredomains.rocks/',
  'http://api.evglbnv.nomoredomains.rocks/',
];

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors(allowedCors));


app.use(express.json());
app.use(cookieParser());

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Connected'))
  .catch((error) => console.log(`Error during connection ${error}`));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});
