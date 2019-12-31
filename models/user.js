'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'el nombre del usuario es obligatorio']
    },
    apellido_paterno: {
        type: String,
        require: [true, 'el apellido paterno es obligatorio']
    },
    apellido_materno: {
        type: String,
        require: [true, 'el apellido materno es obligatorio']
    },
    status: {
        type: String
    },
    google: {
        type: Boolean,
        default: false
    },
    correo: {
        type: String,
        require: [true, 'el correo electronico es obligatorio']
    },
    version: {
        type: String
    },
    password: {
        type: String
    },
    imagen: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);