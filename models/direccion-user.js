let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let DireccionSchema = Schema({
    usuario: {
        type: { type: Schema.ObjectId, ref: 'User' }
    },
    pais: {
        type: String,
        require: [true, 'el pais obligatorio']
    },
    ciudad: {
        type: String,
        require: [true, 'la ciudad es obligatoria']
    },
    estado_region: {
        type: String,
        require: [true, 'el estado u region es obligatorio']
    },


});



module.exports = mongoose.model('Direccion', DireccionSchema);