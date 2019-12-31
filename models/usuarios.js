var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usuariosSchema = Schema({
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
    edad: {
        type: Number,
        require: [true, 'la edad del usuario es requerida']
    },
    correo: {
        type: String,
        require: [true, 'el correo electronico es obligatorio']
    },


});


module.exports = mongoose.model('Usuarios', usuariosSchema);