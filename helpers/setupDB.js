const mongoose = require('mongoose');

const dbUser = process.env.DB_USER || 'default-name';
const dbPass = process.env.DB_PASS || '';
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'test';

module.exports = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPass}@${host}/${dbName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    console.log('connected to db!');
  } catch (e) {
    console.error(e);
  }
};
