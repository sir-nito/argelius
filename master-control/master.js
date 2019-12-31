let mongoose = require('mongoose');
let userModel = require('../models/user');


let obtenerStatus = async(req, res) => {
    if (!req) {
        userModel.findOne({}, ).populate('User')
    }


}