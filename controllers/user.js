'require'
var User = require('../models/user');
var usuario = require('../models/usuarios');
var fs = require('fs');
var moment = require('moment');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var path = require('path');

function Datos(req, res) {
    res.status(200).send({
        message: "api seccion usuario ",
        message2: " en esta seccion de la api se encuentran las funcionalidades de usuarios"
    });
}

function RecuperarContraseña(req, res) {
    let params = req.body;
    if (params.password && params.correo) {
        usuario = new User();
        usuario.password = params.password;
        usuario.correo = params.correo;
        usuario.findOneAndUpdate({
            $or: [
                { correo: usuario.correo.toLowerCase() }
            ]
        }).exec((err, usuarios) => {
            if (err) return res.status(500).send({ message: 'error en la peticion 500' });
            if (usuarios && usuarios.length >= 1) {
                return res.status(400).send({ message: 'el usuario no existe dentro de la base de datos' });
            } else {

                bcrypt.hash(params.password, null, null, (err, hash) => {
                    usuario.password = hash;

                    usuario.save((err, userStored) => {
                        if (err) return res.status(500).send({ message: 'error al guardar el usuario por fabor revise datos' });
                        if (userStored) {
                            res.status(200).send({ user: userStored._id });
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'sisvis01@gmail.com',
                                    pass: 'corbulo12'
                                }
                            });



                            var mailOptions = {
                                from: 'sisvis01@gmail.com',
                                to: usuario.correo,
                                subject: 'validacion de la cuenta',
                                text: "le damos la binevenida a sisvis por favor siga el link paa activar su cuenta",
                                html: '<b><href>http://40.117.253.59:2552/api/validar/' + userStored._id + '</href></b>'
                            };

                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    return res.status(404).send({ message: 'error al enviar' });
                                } else {
                                    return res.status(200).send({ message: 'Revise su correo' });
                                }
                            });
                        } else {
                            res.status(404).send({ message: 'no se ha registrado el usuario' });
                        }
                    });

                });
            }
        });
    } else {
        return res.status(202).send({ message: 'por favor enviar todos los datos' });
    }
}

function Registrar(req, res) {
    var params = req.body;
    var usuario = new User();
    if (params.nombre && params.apellido_paterno &&
        params.apellido_materno &&
        params.correo && params.password
    ) {
        usuario.nombre = params.nombre;
        usuario.apellido_paterno = params.apellido_paterno;
        usuario.apellido_materno = params.apellido_materno;
        usuario.status = 'DESACTIVADA';
        usuario.correo = params.correo;
        usuario.version = 'BASICO';
        usuario.imagen = null;

        User.find({
            $or: [

                { correo: usuario.correo.toLowerCase() }

            ]
        }).exec((err, usuarios) => {
            if (err) return res.status(500).send({ message: 'error en la peticion 500' });
            if (usuarios && usuarios.length >= 1) {
                return res.status(400).send({ message: 'el usuario existe dentro de la base de datos' });
            } else {

                bcrypt.hash(params.password, null, null, (err, hash) => {
                    usuario.password = hash;

                    usuario.save((err, userStored) => {
                        if (err) return res.status(500).send({ message: 'error al guardar el usuario por fabor revise datos' });
                        if (userStored) {
                            res.status(200).send({ user: userStored._id });
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'sisvis01@gmail.com',
                                    pass: 'corbulo12'
                                }
                            });



                            var mailOptions = {
                                from: 'sisvis01@gmail.com',
                                to: usuario.correo,
                                subject: 'validacion de la cuenta',
                                text: "le damos la binevenida a sisvis por favor siga el link paa activar su cuenta",
                                html: '<b><href>http://40.117.253.59:2552/api/validar/' + userStored._id + '</href></b>'
                            };

                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    return res.status(404).send({ message: 'error al enviar' });
                                } else {
                                    return res.status(200).send({ message: 'Revise su correo' });
                                }
                            });
                        } else {
                            res.status(404).send({ message: 'no se ha registrado el usuario' });
                        }
                    });

                });
            }
        });
    } else {
        res.status(200).send({
            message: 'envia todos lo datos'
        });
    }
}

function validarcuenta(req, res) {
    var params = req.params.id;
    var userId = params;
    User.findByIdAndUpdate(userId, { status: 'ACTIVADA' }, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ messsage: 'error en la peticion' });
        if (!userUpdated) return res.status(404).send({ message: 'no se ha podido acutalizar' });
        return res.location('http://40.117.253.59:2552/static/swagger.json');
    });
}
//reparar este codigo
function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;
    //borrar propiedad password
    delete update.password;
    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'no tienes la autoridad suficiente por fabor deciste' });
    }
    User.find({
        $or: [
            { correo: update.correo.toLowerCase() }
        ]
    }).exec((err, users) => {

        var user_isset = false;
        users.forEach((user) => {
            if (user && user._id != userId) user_isset = true;
        });
        if (user_isset) return res.status(404).send({ message: 'alguien mas tiene los mismo datos no se pueden tener los mismos' });


        User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
            if (err) return res.status(500).send({ messsage: 'error en la peticion' });
            if (!userUpdated) return res.status(404).send({ message: 'no se ha podido acutalizar' });
            return res.status(200).send({ user: userUpdated });
        });

    });


}

//subir archivos de imagen

function uploadImage(req, res) {
    var userId = req.params.id;
    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'no tienes autorizacion' });
    }
    if (req.files) {
        var file_path = req.files.image.path;
        console.log(file_path);
        var file_split = file_path.split('/');
        console.log(file_split);
        var file_name = file_split[2];
        console.log(file_name);
        var ext_split = file_name.split('\.');
        console.log(ext_split);
        var file_ext = ext_split[1];
        console.log(file_ext);
        if (userId != req.user.sub) {
            return removeFilesOfUploads(res, file_path, 'extension no valida');
        }
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            //actualizaremos documento de usuario
            User.findByIdAndUpdate(userId, { imagen: file_name }, { new: true }, (err, updateUser) => {
                if (err) return res.status(500).send({ message: 'Error en la paticion verifique' });

                if (!updateUser) return res.status(404).send({ message: 'no se ha podido actualizar' });
                return res.status(200).send({ user: updateUser });

            });
        } else {
            return removeFilesOfUploads(res, file_path, 'extension no valida');
        }
    } else {

        ////////////juanito estuvo aqui solito in ayuda de nadie mas que de mi amor por ella
        return res.status(200).send({ message: 'no se han subido imagenes' });

    }
}

function removeFilesOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: 'extension no valida' });
    });
}

function getImageFile(req, res) {
    var image_File = req.params.imageFile;
    var path_file = './uploads/usuario/' + image_File;
    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'no existe este archivo' });
        }
    });
}

function getUser(req, res) {
    var userId = req.params.id;
    User.findOne({ _id: userId }, (err, user) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' });
        if (!user) return res.status(404).send({ message: 'el usuario no existe' });



    });
}

function IniciarSession(req, res) {
    var params = req.body;
    var correo = params.correo;
    var password = params.password;
    User.findOne({ correo: correo }, (err, user) => {
        if (!user) return res.status(404).send({ message: 'Erro' });
        if (user.status == 'ACTIVADA') {
            User.findOne({ correo: correo }, (err, user) => {
                if (!user) return res.status(500).send({ message: 'el correo no existe' });

                if (user) {
                    bcrypt.compare(password, user.password, (err, check) => {
                        if (check) {
                            if (params.gettoken) {
                                //devolver token2.0
                                //generar un token2.0
                                return res.status(200).send({
                                    token: jwt.createToken(user)
                                });
                            } else {
                                //regresar datos del usuario prueba 1.0
                                user.password = undefined;
                                return res.status(200).send({ user });
                            }

                        } else {
                            return res.status(404).send({ message: 'el usuario no se ha identificado correctamente' });
                        }
                    });
                } else {
                    return res.status(404).send({ message: 'el usuario no se ha identificado correctamente a travez del token' });
                }
            });
        } else {
            return res.status(404).send({ message: 'Porfavor active su cuenta' });
        }
    });
}

/*  
    funciones para demo de servicios
    crud 
*/


module.exports = {
    Datos,
    Registrar,
    validarcuenta,
    IniciarSession,
    getImageFile,
    getUser,
    removeFilesOfUploads,
    updateUser,
    uploadImage,
    RecuperarContraseña

}