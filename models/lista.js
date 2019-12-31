'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ListaSchema = Schema({
    marcador: {
        type: { type: Schema.ObjectId, ref: 'Place' }
    },
    create_at: {
        type: String
    },
    usuario: {
        type: { type: Schema.ObjectId, ref: 'User' }
    }
});



module.exports = mongoose.model('Lista', ListaSchema);