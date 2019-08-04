'use strict'

var jwt =require('jwt-simple');
var moment = require('moment');
var secret = 'Argelius9corbulo12andtieraa';

exports.createToken =function(usuario){
  var playload ={
      sub:usuario._id,
      nombre:usuario.nombre,
      apellido_paterno:usuario.apellido_paterno,
      apellido_materno:usuario.apellido_materno,
      correo:usuario.correo,
      status:usuario.status,
      version:usuario.version,
      imagen: usuario.imagen,
      iat:moment().unix(),
      exp:moment().add(1,'day').unix
  };  
    return jwt.encode(playload,secret)
};