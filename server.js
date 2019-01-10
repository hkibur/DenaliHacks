// Dependencies
var http = require('http');
var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');


var app = express();

app.set('port', (process.env.PORT || 8081));

app.use(compression());

app.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(morgan('dev'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var static_server_opt = {
  'maxAge': 2592000000
}
app.use(express.static(__dirname + '/www/'));



var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
