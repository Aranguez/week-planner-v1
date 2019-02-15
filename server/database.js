const mongoose = require('mongoose');

const URI = 'mongodb://localhost/weekly-planner';

mongoose.connect(URI)
  .then(db => console.log('db is connected'))
  .catch(err => console.error(err));

//mongoose.Promise = global.Promise;

// const db = mongoose.connection

// db.onerror = err => {
//   console.log(err)
// }

module.exports = mongoose