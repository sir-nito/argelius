const mongooose = require('mongooose');
const Schema = mongooose.Schema;

const CategoriaSchema = Schema({
    nombre = {
        type: String,
        require: [true, 'el nombre de categoria es necesario']
    }
});


module.exports = mongoose.model('Categoria', CategoriaSchema);