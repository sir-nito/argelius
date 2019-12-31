'use strict'
var express = require('express');
var argv = require('minimist')(process.argv.slice(2));
var bodyParser = require('body-parser');
var app = express();
var subpath = express();
///cargar rutas
var user_routes = require('./routes/user');
var admin_routes = require('./routes/admin');
var comentarios_routes = require('./routes/comentarios');
var usuarios = require('./routes/usuarios');
var lista_routes = require('./routes/lista');
var video_routes = require('./routes/video');
const swaggerUi = require('swagger-ui-express');
//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');

//cors
// configurar cabeceras http
app.use("/v1", subpath);

var swagger = require('swagger-node-express').createNew(subpath);
app.use(express.static('dist'));
swagger.setApiInfo({
    title: "Argelius api rest full",
    description: "API para consumo libre ...",
    termsOfServiceUrl: "",
    contact: "pancho117_@outlook.com",
    license: "",
    licenseUrl: ""
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});
swagger.configureSwaggerPaths('', 'api-docs', '');

// Configure the API domain
var domain = '40.117.253.59';
if (argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".')

// Configure the API port
var port = 2553;
if (argv.port !== undefined)
    port = argv.port;
else
    console.log('No --port=xxx specified, taking default port ' + port + '.')

// Set and display the application URL
var applicationUrl = 'http://' + domain + ':' + port;
console.log('snapJob API running on ' + applicationUrl);


swagger.configure(applicationUrl, '1.0.0');


// Start the web server
app.listen(port);
app.use('/static', express.static('swagger'));
app.use('/api', user_routes);
app.use('/api', admin_routes);
app.use('/api', comentarios_routes);
app.use('/api', lista_routes);
app.use('/api', video_routes);
app.use('/api', usuarios)
    ///exportar

module.exports = app;