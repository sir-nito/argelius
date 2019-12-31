'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VideoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    imagen: {
        type: String,
    },
    video: {
        type: String,
    },
    direccion: {
        type: String,
        require: true
    },
    horario: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    create_at: {
        type: String,
    },
    categoria: {
        type: { type: Schema.ObjectId, ref: 'Categoria' }
    }
});

module.exports = mongoose.model('Place', VideoSchema);