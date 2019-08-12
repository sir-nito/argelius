'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
///cargar rutas
var user_routes = require('./routes/user');
var admin_routes = require('./routes/admin');
var comentarios_routes = require('./routes/comentarios');
var lista_routes = require('./routes/lista');
var video_routes = require('./routes/video');
//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');

//cors
// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas

app.use('/api',user_routes);
app.use('/api',admin_routes);
app.use('/api',comentarios_routes);
app.use('/api',lista_routes);
app.use('/api',video_routes);
///exportar

module.exports =app;
