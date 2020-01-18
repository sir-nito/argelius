var usuarios = require('../models/usuarios');
var fs = require('fs');
var moment = require('moment');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var path = require('path');


function agregar(req, res) {
    let params = req.body;
    var usuario = new usuarios();
    if (!params.nombre && params.apellido_paterno && params.apellido_materno && params.edad && params.correo) res.status(400).send({ mesage: 'debes mandar los datos completos del Usuario' });
    usuario.nombre = params.nombre;
    usuario.apellido_paterno = params.apellido_paterno;
    usuario.apellido_materno = params.apellido_materno;
    usuario.edad = params.edad;
    usuario.correo = params.correo;

    usuario.save((err, usuarioAgregado) => {
        if (err) return res.status(500).send({ message: " error al guardar el usuario" });

        if (!usuarioAgregado) return res.status(404).send({ message: "el usuario no se ha guardado" });

        return res.status(200).send({ usuario: usuarioAgregado });

    });

}

function actualizar(req, res) {
    var userId = req.params.id;
    var update = req.body;

    usuarios.find({
        $or: [
            { correo: update.correo.toLowerCase() }
        ]
    }).exec((err, users) => {

        var user_isset = false;
        users.forEach((user) => {
            if (user && user._id != userId) user_isset = true;
        });
        if (user_isset) return res.status(404).send({ message: 'alguien mas tiene los mismo datos no se pueden tener los mismos' });


        usuarios.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
            if (err) return res.status(500).send({ messsage: 'error en la peticion' });
            if (!userUpdated) return res.status(404).send({ message: 'no se ha podido acutalizar' });
            return res.status(200).send({ user: userUpdated });
        });

    });
}


function eliminar(req, res) {
    var usuarioId = req.params.id;

    usuarios.find({ 'usuario': usuarioId }).remove((err) => {
        if (err) return res.status(500).send({ message: 'error al dejar de eliminar' });
        return res.status(200).send({ message: 'el uuario se ha eliminado' });
    });

}

function obtener(req, res) {
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    var itemsPerPage = 10;
    usuarios.find().sort('').populate('usuarios').paginate(page, itemsPerPage,
        (err, usuarios, total) => {
            if (err) return res.status(500).send({ message: 'error en la peticion' });

            if (!usuarios) return res.status(404).send({ message: 'no hay lugares disponibles' });

            return res.status(200).send({
                total_items: total,
                pages: Math.ceil(total / itemsPerPage),
                page: page,
                items_per_page: itemsPerPage,
                usuarios
            });
        });

}

function obtenerUsuarioByID(req, res) {

    var userId = req.params.id;
    usuarios.findOne({ _id: 'ObjectId' (userId) }, (err, user) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' });
        if (!user) return res.status(404).send({ message: 'el usuario no existe' });



    });
}


module.exports = {
    agregar,
    actualizar,
    obtener,
    eliminar,
    obtenerUsuarioByID
}