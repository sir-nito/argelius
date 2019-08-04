'use strict'

var Comentarios = require('../models/comentarios');
var path = require('path');
var fs = require('fs');
var moment= require('moment');
var mongoosePaginate= require('mongoose-pagination');


function sendComentario(req,res){
      var params = req.body;
      var Comentar= new Comentarios();
      Comentar.comentario = params.comentario;
      Comentar.created_at = moment().unix();
      Comentar.user = req.user.sub;
      Comentar.video = params.video;
      if(!params.comentario  ) return res.status(500).send({message:'debes enviar todos los datos'});  
   Comentar.save((err,ComentarioStored)=>{
       if(err) return res.status(500).send({message:'error al enviar los datos'});

       if(!ComentarioStored) return res.status(404).send({message:'error conexion rechazada'});

    return res.status(200).send({comentario:ComentarioStored})
   })
}

function getComentarios(req,res){
    var page=1;
    var id = req.params.id;
    if(req.params.page){
        page=req.params.page;
    }
   var itemsPerPage=6;
     
 Comentarios.find({video:id}).sort('created_at').populate('Comentarios').paginate(page,itemsPerPage,
                    (err,comentarios,total)=>{
         if(err) return res.status(500).send({message:'error en la peticion'});
         
         if(!comentarios) return res.status(404).send({message:'no hay lugares disponibles'});
     
         return res.status(200).send({
             total_items:total,
             pages:Math.ceil(total/itemsPerPage),
             page:page,
             items_per_page:itemsPerPage,
             comentarios
         });
     });
}



module.exports= {
    sendComentario,
    getComentarios
}
