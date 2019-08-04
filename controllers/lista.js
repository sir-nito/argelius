'use strict'

var path = require('path');
var fs = require('fs');
var moment= require('moment');
var mongoosePaginate= require('mongoose-pagination');

var Lista= require('../models/lista');
function crearMarcador(req,res){
    var params = req.body;
    var lista = new Lista();
    lista.created_at = moment().unix();
    lista.usuario = req.user.sub;
    lista.marcador = params.marcador;
    
    lista.save((err,listaStored)=>{
        if(err) return res.status(500).send({message:'el marcador no se ha guardado'});
    
        if(!listaStored) return res.status(404).send({message:'el marcador no ha sido agregado '});
        
        
        return res.status(200).send({lista:listaStored});
    });
}
function deleteMarcador(req,res){
    var usuarioId = req.user.sub;
    var marcadorId= req.params.id;
    
    MyPlace.find({'usurio':usuarioId,'marcador':marcadorId}).remove((err)=>{
        if(err) return res.status(500).send({message:'error al dejar de seguir'});
        return res.status(200).send({message:'el marcador se ha eliminado'});
    }); 
}
function getMisMarcadores(req,res){
    var page = 1;  
    var id= req.params.id;
    if(req.params.page){
        page = req.params.page;
    }     
    var itemsPerPage = 10;    
        Lista.find({usuario:id}).sort('created_at').populate('MLista').paginate(page,itemsPerPage,(err,milista,total)=>{
            if(err) return res.status(500).send({message:'error al devolver el marcador'});
            
            if(!milista) return res.status(404).send({message:'no hay marcadores guardadoss'});
            
            return res.status(200).send({
                total_items:total,
                pages:Math.ceil(total/itemsPerPage),
                page:page,
                milista
        });
    });
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77
module.exports={
    crearMarcador,
    getMisMarcadores,
    deleteMarcador
    
}
