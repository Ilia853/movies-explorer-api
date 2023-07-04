// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});