const mongoose = require("mongoose");
const MONGO_URL = "mongodb://arantar:arantarps2@ds213715.mlab.com:13715/weekly-planner";

// Connect to database
mongoose
  .connect(MONGO_URL, {useNewUrlParser: true})
  .catch(err => console.error(err));

// When successfully connected
mongoose.connection.on('connected', () => { 
  console.log('Mongoose default connection open to ' + MONGO_URL);
});

// // If the connection throws an error
mongoose.connection.on('error', (err) => {  
  console.log('Mongoose default connection error: ' + err);
});

// // When the connection is disconnected
mongoose.connection.on('disconnected', () => {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }).catch(err => console.error(err)); 
});

module.exports = mongoose;