const express = require('express');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const router = new express.Router();//pega apenas as funções de rotas

const upload = multer(uploadConfig);//para poder realizar o upload das imagens

router.get('/posts', PostController.index);//lista as imagens
router.post('/posts', upload.single('image'), PostController.store);//pega os dados das imagens

router.post('/posts/:id/like', LikeController.store);

module.exports = router;