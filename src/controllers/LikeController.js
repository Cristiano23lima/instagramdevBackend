const Post = require('../models/Post');//pega o post criado 

module.exports = {
    async store(req, res){//função para dar likes nas fotoss
        const post = await Post.findById(req.params.id);
        post.likes += 1;

        await post.save();//salva as alterações

        req.io.emit('like', post);
        
        return res.json(post);
    }
}