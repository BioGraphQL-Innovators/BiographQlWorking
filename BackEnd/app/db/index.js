/* eslint-disable no-console */
const { connect } = require('mongoose');

require('dotenv').config();

const { DB_HOST } = process.env;

connect(DB_HOST, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => console.log(`${DB_HOST} is running..`))
  .catch((err) => {
    console.error(`ERROR 500 || ${err.message}`);
  });

// Model
