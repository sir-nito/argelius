'use strict'
var path = require('path');
var fs = require('fs');
var moment= require('moment');
var mongoosePaginate= require('mongoose-pagination');
var Video= require('../models/video');



function saveVideo(req,res){
    var params = req.body;
    var video = new Video(); 
    if(!params.nombre && !params.descripcion && !params.categoria && !params.direccion && !params.horario ) res.status(200).send({mesage:'debes mandar los datos completos del producto'});
    
    video.nombre = params.nombre;
    video.descripcion = params.descripcion;
    video.imagen = '';
    video.video = '';
    video.categoria = params.categoria;
    video.direccion = params.direccion;
    video.horario = params.horario;
    video.url = params.url;
    video.created_at = moment().unix();
 
    
    video.save((err,videoAlmacenado)=>{
        if(err) return res.status(500).send({message:'error al guardar el lugar'});
    
        if(!videoAlmacenado) return res.status(404).send({message:'el lugar no se ha guardado'});
        
        
        return res.status(200).send({video:videoAlmacenado});
    });
}
 function getVideo(req,res){     
    var page=1;
    if(req.params.page){
        page=req.params.page;
    }
   var itemsPerPage=6;
     
 Video.find().sort('created_at').populate('Video').paginate(page,itemsPerPage,
                    (err,videos,total)=>{
         if(err) return res.status(500).send({message:'error en la peticion'});
         
         if(!videos) return res.status(404).send({message:'no hay lugares disponibles'});
     
         return res.status(200).send({
             total_items:total,
             pages:Math.ceil(total/itemsPerPage),
             page:page,
             items_per_page:itemsPerPage,
              videos
         });
     });
}
function getVideoMovil(req,res){
    Video.find((err,video) =>{
        if(err) return res.status(500).send({message:'error en tu peticion'});
        if(!video) return res.status(500).send({message:'no exitsen datos '});
        if(video) return res.status(200).send({Video:video});
    });
}
    function Videoid(req,res){
        var id = req.params.id;
        Video.findById(id,(err,videos)=>{
 if(err) return res.status(500).send({message:'error en la peticion'});
 
 if(!videos) return res.status(404).send({message:'no hay lugares disponibles'});

 return res.status(200).send({vides:videos
 });
});
     }
function deleteVideo(req,res){
    var videoId = req.params.id;
    
    Video.find({'_id':videoId}).remove((err,videoRemoved)=>{
        if(err) return res.status(500).send({message:"Error al borrar el video"});   
     return res.status(200).send({video:videoRemoved});
    });
}
    function uploadImage(req,res){
    var placeId = req.params.id;
    
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];
        var ext_split= file_name.split('\.');
        var file_ext = ext_split[1];
        
        if(file_ext=='png' || file_ext=='jpg' || file_ext=='jpeg' ||file_ext == 'gif'){
           //actualizaremos documento de usuario
            
                   Video.findByIdAndUpdate(placeId,{imagen:file_name},{new:true},(err,videoUpdate)=>{
                if(err) return res.status(500).send({message:'Error en la paticion verifique'});
            
            if(!videoUpdate) return res.status(404).send({message:'no se ha podido actualizar'});
                                 return res.status(200).send({place: videoUpdate});                      
                                
            });
                   
            
            
           }else{
           return  removeFilesOfUploads(res,file_path,'extension no valida');
           }
    }else{
        
        ////////////jmejorar el codigo  por fallos en la logica del programa especialmente en el count por 
        /////////////falla en la compatibilidad de versiones para futuros cambios
        return res.status(200).send({message:'no se han subido imagenes'});
        
    }
}
    function removeFilesOfUploads(res,file_path,message){
    fs.unlink(file_path,(err)=>{
            return res.status(200).send({message:'extension no valida'});
        });
}
    
    function getImageFile(req,res){
    var image_File = req.params.imageFile;
    var path_file = './uploads/video/'+image_File;
    fs.exists(path_file,(exists)=>{
        if(exists){
            res.sendFile(path.resolve(path_file));
           }else{
               res.status(200).send({message:'no existe este archivo'});
           }
    });
}    
function uploadVideo(req,res){
    var videoId = req.params.id;
    if(req.files){
        var file_path = req.files.video.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];
        var ext_split= file_name.split('\.');
        var file_ext = ext_split[1];
        if(file_ext=='mp4' || file_ext=='mov' || file_ext=='avi' ){
           //actualizaremos documento de usuario
            
                   Video.findByIdAndUpdate(videoId,{video:file_name},{new:true},(err,videoUpdate)=>{
                if(err) return res.status(500).send({message:'Error en la peticion verifique'});
            
            if(!videoUpdate) return res.status(404).send({message:'no se ha podido actualizar'});
                                 return res.status(200).send({place: videoUpdate});                      
                                
            });
                   
            
            
           }else{
           return  removeFilesOfUploads(res,file_path,'extension no valida');
           }
    }else{
        
        ////////////jmejorar el codigo  por fallos en la logica del programa especialmente en el count por 
        /////////////falla en la compatibilidad de versiones para futuros cambios
        return res.status(200).send({message:'no se han subido imagenes'});
        
    }
}

function getImageVideo(req,res){
    var image_File = req.params.imageFile;
    var path_file = './uploads/placeVideo/'+image_File;
    fs.exists(path_file,(exists)=>{
        if(exists){
            res.sendFile(path.resolve(path_file));
           }else{
               res.status(200).send({message:'no existe este archivo'});
           }
    });
}   

module.exports = {
    saveVideo,
    getVideo,
    deleteVideo,
    uploadImage,
    removeFilesOfUploads,
    getImageFile,
    Videoid,
    uploadVideo,
    getImageVideo,
    getVideoMovil
    
}
