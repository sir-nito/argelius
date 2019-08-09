'use strict'

var express = require('express');
var VideoController= require('../controllers/video');
var api= express.Router();
var middleware = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/video'});
var md_upload_vid = multipart({uploadDir:'./uploads/placeVideo'});
api.post('/save-place',VideoController.saveVideo);
api.delete('/place/:id',middleware.ensureAuth,VideoController.deleteVideo);
api.post('/upload-image-pla/:id',[middleware.ensureAuth,md_upload],VideoController.uploadImage);
api.post('/upload-video-pla/:id',[middleware.ensureAuth,md_upload_vid],VideoController.uploadVideo);
api.get('/places/:page?',middleware.ensureAuth,VideoController.getVideo);
api.get('/Lugares-Movil',middleware.ensureAuth,VideoController.getVideoMovil);
api.get('/get-image-place/:imageFile',VideoController.getImageFile);
api.get('/get-video-place/:imageFile',VideoController.getImageVideo);
api.get('/get-Place-id/:id',middleware.ensureAuth,VideoController.Videoid);  
module.exports=api;     
