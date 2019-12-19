const Post = require('../models/Post');//pega o post criado 
const sharp = require('sharp');
const path = require('path');//para caminhos de arquivos
const fs = require('fs');//file system

module.exports = {
    async index(req, res){//essa função vai listar os post e vai ser assincrona
        const posts = await Post.find().sort('-createdAt')//-created -> ORDER BY createdAt DESC

        return res.json(posts);
    },
    async store(req, res){//vai cadastrar novos post
        const {author, place, description, hashtags} = req.body;
        const {filename: image} = req.file;

        await sharp(req.file.path)//caminho onde a imagem foi salva
            .resize(500)
            .jpeg({quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', image)//salva a imagem redimensionada na pasta resized 
            )
        
        fs.unlinkSync(req.file.path);//apaga a imagem original

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image,
        });//await->voce utiliza quando uma ação poderá demorar um certo tempo, dai ele espera ela terminar para continuar
        
        req.io.emit('post', post);//acessa em tempo real um novo post cadastrado
        return res.json(post);
    }
}
