
const morgan = require('morgan');
const express = require('express');
const { mongoose } = require('./database');
const path = require('express')

const app = express();

app.set('port', process.env.PORT || 3000);
const PORT = app.get('port');

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
const routes = require('./routes')
app.use(routes);

app.use(express.static('../client/public'));

//mongodb


app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT)
});