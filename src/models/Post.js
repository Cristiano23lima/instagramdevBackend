const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: String,//quem postou
    place: String,//onde postou
    description: String,//descrição
    hashtags: String,//as hashtags(#)
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,//cria dois campos chamados createdAt e updatedAt na tabela
});

module.exports = mongoose.model('Post', PostSchema);