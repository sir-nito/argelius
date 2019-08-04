var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ComentariosSchema = Schema({
    created_at:String,
    user:{ type: Schema.ObjectId, ref:'User'},
    video:{type:Schema.ObjectId, ref:'Place'},
    comentario:String
});

module.exports= mongoose.model('Comentario',ComentariosSchema);