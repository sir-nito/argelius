'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port  = 2552;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/MIAPI',{ useNewUrlParser: true })
        .then(()=> {
            console.log('conexion correcta a la base de datos');

            app.listen(port,()=>{
                console.log("servidor creado corriendo en http://ipactual:2552");
            });

        })
        .catch(err => console.log(err));