
/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), http = require('http'), path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var statusCode = 200;

app.get('/', routes.index);

app.get('/ip', function(req, res){
  res.render('ip');
});

app.get('/fix', function(req, res){
  res.send();
  res.writeHead(200, {"Content-Type": "text/plain"});
  if (statusCode == 200) res.write('already fixed');
  else res.write('Fixed! Current statusCode: '+ res.statusCode);
  statusCode = res.statusCode;
});

app.get('/kill', function(req, res){
  res.send();
  res.writeHead(500, {"Content-Type": "text/plain"});
  if (statusCode == 500) res.write('already killed');
  else res.write('Killed! current statusCode: '+ res.statusCode);
  statusCode = res.statusCode;
});

app.get('/health', function(req, res){
  res.send();
  res.writeHead(statusCode, {"Content-Type": "text/plain"});
  res.write('Health status: '+ statusCode);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server listening on port " + app.get('port'));
});



