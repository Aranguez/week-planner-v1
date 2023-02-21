
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
require('./database');
const path = require('path')

const app = express();

app.set('port', process.env.PORT || 5000);
const PORT = app.get('port');

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
const routes = require('./routes')
app.use(routes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT)
});